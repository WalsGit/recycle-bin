<?php

namespace Walsgit\RecycleBin\Tests\integration;

use Carbon\Carbon;

/**
 * Shared helpers to build recycle bin test data.
 */
trait BinFixtures
{
    /**
     * Deleting a model fires its events, which remove related posts and notifications.
     * This per-item cleanup is intended, and bounded by MAX_ITEMS_PER_ALL_REQUEST.
     * Restoring saves each item, hence the repeated updates.
     * Quote styles and table prefix vary between drivers and CI jobs, so they are built dynamically.
     */
    protected function allowedRepeatedQueries(): array
    {
        $prefix = $this->database()->getTablePrefix();
        $allowed = [];

        foreach (['notifications', 'discussions', 'posts'] as $table) {
            foreach (['"', '`'] as $quote) {
                $allowed[] = "delete from {$quote}{$prefix}{$table}{$quote}";
                $allowed[] = "update {$quote}{$prefix}{$table}{$quote}";
            }
        }

        return $allowed;
    }

    /**
     * Build the data of a discussion for the test database (hidden by default)
     */
    protected function discussionData(int $id, bool $hidden = true): array
    {
        $now = Carbon::now()->toDateTimeString();

        return [
            'id' => $id,
            'title' => "Discussion $id",
            'slug' => "discussion-$id",
            'created_at' => $now,
            'last_posted_at' => $now,
            'user_id' => 1,
            'comment_count' => 1,
            'hidden_at' => $hidden ? $now : null,
        ];
    }

    /**
     * Build the data of a post for the test database (hidden comment by default)
     */
    protected function postData(int $id, int $discussionId = 1, bool $hidden = true, string $type = 'comment', string $content = '<t>Content</t>'): array
    {
        $now = Carbon::now()->toDateTimeString();

        return [
            'id' => $id,
            'discussion_id' => $discussionId,
            'number' => $id,
            'user_id' => 1,
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
