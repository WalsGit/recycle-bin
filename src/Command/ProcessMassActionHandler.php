<?php

namespace Walsgit\RecycleBin\Command;

use Carbon\Carbon;
use Carbon\Exceptions\InvalidFormatException;
use Flarum\Discussion\Discussion;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\ValidationException;
use Flarum\Post\CommentPost;
use Flarum\Post\Post;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Walsgit\RecycleBin\Log\DeletionLogger;

class ProcessMassActionHandler
{
    use DispatchEventsTrait;

    private const MAX_IDS_PER_REQUEST = 100;
    private const CHUNK_SIZE = 50;
    private const MAX_ITEMS_PER_ALL_REQUEST = 200;

    /**
     * Map of supported resource types to their Eloquent model classes.
     *
     * @var array<string, class-string<Model>>
     */
    private array $modelMap = [
        'discussions'   => Discussion::class,
        'posts'         => Post::class,
    ];

    public function __construct(
        protected ConnectionInterface $db,
        protected Dispatcher $events,
        protected DeletionLogger $deletionLog
    ) {
    }

    /**
     * Handle the mass action command
     *
     * @return array{processed: int, has_more: bool, remaining: int}
     *
     * @throws \Flarum\User\Exception\PermissionDeniedException
     * @throws ValidationException
     */
    public function handle(ProcessMassAction $command): array
    {
        $this->validateCommand($command);

        $modelClass = $this->modelMap[$command->type];
        $hiddenBefore = $command->all ? $this->parseHiddenBefore($command->hiddenBefore) : null;

        // The deleted items are logged as one summary line instead of one line each
        $result = $this->deletionLog->withoutItemLogs(
            fn () => $this->process($command, $modelClass, $hiddenBefore)
        );

        if ($command->action === 'delete' && $result['processed'] > 0) {
            $this->deletionLog->logMassAction($command->actor, [
                'type' => $command->type,
                'mode' => $command->all ? 'all' : 'selection',
                'processed' => $result['processed'],
                'has_more' => $result['has_more'],
                'hidden_before' => $hiddenBefore?->toIso8601String(),
                'requested_ids' => $command->all ? null : $command->ids,
            ]);
        }

        return $result;
    }

    /**
     * @param class-string<Model> $modelClass
     *
     * @return array{processed: int, has_more: bool, remaining: int}
     */
    private function process(ProcessMassAction $command, string $modelClass, ?Carbon $hiddenBefore): array
    {
        if ($hiddenBefore !== null) {
            return $this->processAll($modelClass, $command->action, $command->actor, $hiddenBefore);
        }

        $count = 0;

        foreach (array_chunk($command->ids, self::CHUNK_SIZE) as $chunk) {
            $count += $this->processChunk($chunk, $modelClass, $command->action, $command->actor);
        }

        return ['processed' => $count, 'has_more' => false, 'remaining' => 0];
    }

    /**
     * Validate actor permissions and payload
     *
     * @throws \Flarum\User\Exception\PermissionDeniedException
     * @throws ValidationException
     */
    private function validateCommand(ProcessMassAction $command): void
    {
        $command->actor->assertAdmin();

        if (! isset($this->modelMap[$command->type])) {
            throw new ValidationException(['type' => 'Invalid or unsupported resource type.']);
        }

        if (! in_array($command->action, ['restore', 'delete'], true)) {
            throw new ValidationException(['action' => 'Invalid action.']);
        }

        if (! $command->all) {
            if (empty($command->ids)) {
                throw new ValidationException(['ids' => 'No items selected.']);
            }

            if (count($command->ids) > self::MAX_IDS_PER_REQUEST) {
                throw new ValidationException(['ids' => 'Too many items selected (maximum ' . self::MAX_IDS_PER_REQUEST . ').']);
            }
        }
    }

    /**
     * "All" mode only processes the items the actor could see in the bin: those hidden
     * at or before the moment the list was loaded. Without it, items hidden since then
     * (for example by another admin) would be processed without ever being shown.
     * `hidden_at` has a precision of one second, so an item hidden within the same second
     * as the marker is still processed.
     *
     * @throws ValidationException
     */
    private function parseHiddenBefore(?string $value): Carbon
    {
        if ($value === null || trim($value) === '') {
            throw new ValidationException(['hidden_before' => 'The hidden_before date is required with "all". Reload the page and try again.']);
        }

        try {
            return Carbon::parse($value)->utc();
        } catch (InvalidFormatException) {
            throw new ValidationException(['hidden_before' => 'Invalid hidden_before date.']);
        }
    }

    /**
     * Process a limited batch of hidden items of the bin
     *
     * Processed items leave the bin (restored or deleted), so calling this
     * repeatedly until `has_more` is false empties the bin.
     *
     * @param class-string<Model> $modelClass
     *
     * @return array{processed: int, has_more: bool, remaining: int}
     */
    private function processAll(string $modelClass, string $action, User $actor, Carbon $hiddenBefore): array
    {
        $query = $this->binQuery($modelClass, $hiddenBefore)->orderBy('id');

        // Fetch one extra item to know if there is more to process
        $items = $query->limit(self::MAX_ITEMS_PER_ALL_REQUEST + 1)->get();
        $hasMore = $items->count() > self::MAX_ITEMS_PER_ALL_REQUEST;
        $count = 0;

        foreach ($items->take(self::MAX_ITEMS_PER_ALL_REQUEST)->chunk(self::CHUNK_SIZE) as $chunk) {
            $count += $this->db->transaction(function () use ($chunk, $action, $actor) {
                foreach ($chunk as $item) {
                    $this->processItem($item, $action, $actor);
                }

                return $chunk->count();
            });
        }

        // Lets the client keep its progress total accurate without another request
        $remaining = $hasMore ? $this->binQuery($modelClass, $hiddenBefore)->count() : 0;

        return ['processed' => $count, 'has_more' => $hasMore, 'remaining' => $remaining];
    }

    /**
     * Query of the items that belong to the bin: hidden discussions, or hidden comment posts,
     * optionally only those hidden at or before the given moment
     *
     * @param class-string<Model> $modelClass
     */
    private function binQuery(string $modelClass, ?Carbon $hiddenBefore = null): Builder
    {
        $query = $modelClass::query()->whereNotNull('hidden_at');

        if ($hiddenBefore !== null) {
            $query->where('hidden_at', '<=', $hiddenBefore->format('Y-m-d H:i:s'));
        }

        if ($modelClass === Post::class) {
            $query->where('type', 'comment');
        }

        return $query;
    }

    /**
     * Process a chunk of items inside a DB transaction
     *
     * @param array<int> $chunk
     * @param class-string<Model> $modelClass
     */
    private function processChunk(array $chunk, string $modelClass, string $action, User $actor): int
    {
        return $this->db->transaction(function () use ($chunk, $modelClass, $action, $actor) {
            /**
             * @var \Illuminate\Database\Eloquent\Collection<int,Model> $items
             */
            $items = $this->binQuery($modelClass)
                ->whereIn('id', $chunk)
                ->get();
            $processed = 0;

            foreach ($items as $item) {
                $this->processItem($item, $action, $actor);
                $processed++;
            }

            return $processed;
        });
    }

    /**
     * Process a single item, then dispatch the domain events raised by the model
     *
     * Direct model calls only raise events, they do not dispatch them. Dispatching
     * is what keeps the discussion and user counters up to date, deletes a
     * discussion left without posts, and notifies the listeners of other extensions.
     */
    private function processItem(Model $item, string $action, User $actor): void
    {
        // The bin only contains discussions and comment posts, the models that can be restored
        if (! $item instanceof Discussion && ! $item instanceof CommentPost) {
            throw new \LogicException('Unsupported bin item: ' . $item::class);
        }

        if ($action === 'restore') {
            $item->restore();
            $item->save();
        } else {
            $item->delete();
        }

        $this->dispatchEventsFor($item, $actor);
    }
}
