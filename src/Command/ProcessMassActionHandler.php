<?php

namespace Walsgit\RecycleBin\Command;

use Flarum\Discussion\Discussion;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\ValidationException;
use Flarum\Post\Post;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

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
        protected Dispatcher $events
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

        if ($command->all) {
            return $this->processAll($modelClass, $command->action, $command->actor);
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
     * Process a limited batch of hidden items of the bin
     *
     * Processed items leave the bin (restored or deleted), so calling this
     * repeatedly until `has_more` is false empties the bin.
     *
     * @param class-string<Model> $modelClass
     *
     * @return array{processed: int, has_more: bool, remaining: int}
     */
    private function processAll(string $modelClass, string $action, User $actor): array
    {
        $query = $this->binQuery($modelClass)->orderBy('id');

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
        $remaining = $hasMore ? $this->binQuery($modelClass)->count() : 0;

        return ['processed' => $count, 'has_more' => $hasMore, 'remaining' => $remaining];
    }

    /**
     * Query of the items that belong to the bin: hidden discussions, or hidden comment posts
     *
     * @param class-string<Model> $modelClass
     */
    private function binQuery(string $modelClass): Builder
    {
        $query = $modelClass::query()->whereNotNull('hidden_at');

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
            $items = $modelClass::query()
                ->whereIn('id', $chunk)
                ->whereNotNull('hidden_at')
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
        if ($action === 'restore') {
            $item->restore();
            $item->save();
        } else {
            $item->delete();
        }

        $this->dispatchEventsFor($item, $actor);
    }
}
