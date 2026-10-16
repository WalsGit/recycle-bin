<?php

namespace Walsgit\RecycleBin\Command;

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Eloquent\Model;
use Flarum\Foundation\ValidationException;

class ProcessMassActionHandler
{
    private const MAX_IDS_PER_REQUEST   = 100;
    private const CHUNK_SIZE            = 50;

    /**
     * Map of supported resource types to their Eloquent model classes.
     *
     * @var array<string, class-string<Model>>
     */
    private array $modelMap =  [
        'discussions'   => Discussion::class,
        'posts'         => Post::class,
    ];

    public function __construct(
        protected ConnectionInterface $db
    ) {
    }

    /**
     * Handle the mass action command
     *
     * @throws \Flarum\User\Exception\PermissionDeniedException
     * @throws ValidationException
     */
    public function handle(ProcessMassAction $command): int
    {
        $this->validateCommand($command);

        $modelClass = $this->modelMap[$command->type];
        if ($command->all) {
            return $this->processAll($modelClass, $command->action);
        }
        $count = 0;

        foreach (array_chunk($command->ids, self::CHUNK_SIZE) as $chunk) {
            $count += $this->processChunk($chunk, $modelClass, $command->action);

        }

        return $count;
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
     * Process every hidden item of the bin
     *
     * @param class-string<Model> $modelClass
     */
    private function processAll(string $modelClass, string $action): int
    {
        $count = 0;
        $query = $modelClass::query()->whereNotNull('hidden_at');

        if ($modelClass === Post::class) {
            $query->where('type', 'comment');
        }

        $query->chunkById(self::CHUNK_SIZE, function ($items) use (&$count, $action) {
            $this->db->transaction(function () use ($items, &$count, $action) {
                foreach ($items as $item) {
                    $this->processItem($item, $action);
                    $count++;
                }
            });
        });

        return $count;
    }

    /**
     * Process a chunk of items inside a DB transaction
     *
     * @param array<int> $chunk
     * @param class-string<Model> $modelClass
     */
    private function processChunk(array $chunk, string $modelClass, string $action): int
    {
        return $this->db->transaction(function () use ($chunk, $modelClass, $action) {
            /**
             * @var \Illuminate\Database\Eloquent\Collection<int,Model> $items
             */
            $items = $modelClass::query()
                ->whereIn('id', $chunk)
                ->whereNotNull('hidden_at')
                ->get();
            $processed = 0;

            foreach ($items as $item) {
                $this->processItem($item, $action);
                $processed++;
            }

            return $processed;
        });
    }

    /**
     * Process a single Item
     */
    private function processItem(Model $item, string $action): void
    {
        if ($action === 'restore') {
            $item->restore();
            $item->save();

            return;
        }
        
        $item->delete();
    }
}
