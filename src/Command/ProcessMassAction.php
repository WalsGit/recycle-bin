<?php

namespace Walsgit\RecycleBin\Command;

use Flarum\User\User;

class ProcessMassAction
{
    /**
     * @param User $actor The user performing the action
     * @param string $type The resource type to act on ('discussions' or 'posts')
     * @param string $action the action to perform ('restore' or 'delete')
     * @param array<int|string> $ids the resource item IDs to process
     * @param bool $all whether to process every hidden item of this type (`$ids` is then ignored)
     */
    public function __construct(
        public User $actor,
        public string $type,
        public string $action,
        public array $ids,
        public bool $all = false
    ) {
    }
}

