<?php

namespace Walsgit\RecycleBin\Command;

use Flarum\Discussion\Discussion;
use Flarum\Post\Post;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

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
        'discussion'    => Discussion::class,
        'discussions'   => Discussion::class,
        'post'          => Post::class,
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
     * @throws InvalidArgumentException
     */
    public function handle(ProcessMassAction $command): int
    {
        $this->validateCommand($command);

        $modelClass = $this->modelMap[$command->type];
        $ids = array_slice($command->ids, 0, self::MAX_IDS_PER_REQUEST);
        $count = 0;

        foreach (array_chunk($ids, self::CHUNK_SIZE) as $chunk) {
            $count += $this->processChunk($chunk, $modelClass, $command->action);

        }

        return $count;
    }

    /**
     * Validate actor permissions and payload
     *
     * @throws \Flarum\User\Exception\PermissionDeniedException
     * @throws InvalidArgumentException
     */
    private function validateCommand(ProcessMassAction $command): void
    {
        $command->actor->assertAdmin();

        if (! isset($this->modelMap[$command->type])) {
            throw new InvalidArgumentException('Invalid or unsupported resource type.');
        }

        if (empty($command->ids) || ! in_array($command->action, ['restore', 'delete'], true)) {
            throw new InvalidArgumentException('Invalid parameters supplied for mass action.');
        }
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
            $items = $modelClass::query()->whereIn('id', $chunk)->get();
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
            if (method_exists($item, 'restore')) {
                $item->restore();
            }
            $item->save();
            return;
        }
        
        if ($action === 'delete') {
            $item->delete();
        }
    }
}
