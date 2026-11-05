<?php

namespace Walsgit\RecycleBin\Tests\integration;

use Carbon\Carbon;

/**
 * Shared helpers to build recycle bin test data.
 */
trait BinFixtures
{
    /**
     * Deleting or restoring a model fires its events: related posts and notifications
     * are removed, and core listeners refresh the discussion and user counters of each
     * item. This per-item work is intended, and bounded by MAX_ITEMS_PER_ALL_REQUEST.
     * Quote styles and table prefix vary between drivers and CI jobs, so they are built dynamically.
     */
    protected function allowedRepeatedQueries(): array
    {
        $prefix = $this->database()->getTablePrefix();
        $allowed = [];

        foreach (['"', '`'] as $quote) {
            foreach (['notifications', 'discussions', 'posts', 'users'] as $table) {
                $allowed[] = "delete from {$quote}{$prefix}{$table}{$quote}";
                $allowed[] = "update {$quote}{$prefix}{$table}{$quote}";
                $allowed[] = "select * from {$quote}{$prefix}{$table}{$quote}";
                $allowed[] = "select count(*) as {$quote}aggregate{$quote} from {$quote}{$prefix}{$table}{$quote}";
            }
        }

        return $allowed;
    }

    /**
     * Build the data of a discussion for the test database (hidden by default)
     */
    protected function discussionData(int $id, bool $hidden = true, int $userId = 1): array
    {
        $now = Carbon::now()->toDateTimeString();

        return [
            'id' => $id,
            'title' => "Discussion $id",
            'slug' => "discussion-$id",
            'created_at' => $now,
            'last_posted_at' => $now,
            'user_id' => $userId,
            'comment_count' => 1,
            'last_post_number' => 1,
            'hidden_at' => $hidden ? $now : null,
        ];
    }

    /**
     * Build the data of a post for the test database (hidden comment by default)
     */
    protected function postData(int $id, int $discussionId = 1, bool $hidden = true, string $type = 'comment', string $content = '<t>Content</t>', int $userId = 1): array
    {
        $now = Carbon::now()->toDateTimeString();

        return [
            'id' => $id,
            'discussion_id' => $discussionId,
            'number' => $id,
            'user_id' => $userId,
            'created_at' => $now,
            'type' => $type,
            'content' => $content,
            'hidden_at' => $hidden ? $now : null,
        ];
    }

    protected function isHiddenDiscussion(int $id): bool
    {
        return $this->database()->table('discussions')->where('id', $id)->whereNotNull('hidden_at')->exists();
    }

    protected function isHiddenPost(int $id): bool
    {
        return $this->database()->table('posts')->where('id', $id)->whereNotNull('hidden_at')->exists();
    }

    protected function postExists(int $id): bool
    {
        return $this->database()->table('posts')->where('id', $id)->exists();
    }

    protected function discussionExists(int $id): bool
    {
        return $this->database()->table('discussions')->where('id', $id)->exists();
    }
}
