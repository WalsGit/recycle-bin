<?php

namespace Walsgit\RecycleBin\Listener;

use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\Post\Event\Deleted as PostDeleted;
use Walsgit\RecycleBin\Log\DeletionLogger;

/**
 * Logs the permanent deletion of discussions and posts that were in the bin (hidden).
 * Deletions made by a mass action are summarized by the mass action itself.
 */
class LogDeletion
{
    public function __construct(
        protected DeletionLogger $log
    ) {
    }

    public function __invoke(DiscussionDeleted|PostDeleted $event): void
    {
        if ($event instanceof DiscussionDeleted) {
            $discussion = $event->discussion;

            if ($discussion->hidden_at !== null) {
                $this->log->logItem('discussion', $discussion->id, $event->actor, ['title' => $discussion->title]);
            }

            return;
        }

        $post = $event->post;

        if ($post->hidden_at !== null && $post->type === 'comment') {
            $this->log->logItem('post', $post->id, $event->actor, ['discussion_id' => $post->discussion_id]);
        }
    }
}
