<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\Discussion\Event\Restored as DiscussionRestored;
use Flarum\Extend;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Post\Event\Restored as PostRestored;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;
use Walsgit\RecycleBin\Tests\integration\BinFixtures;

/**
 * Mass actions must dispatch the same domain events as the single-item core endpoints,
 * so that counters stay correct and listeners of other extensions are notified.
 *
 * Core rules these tests rely on:
 * - discussion.comment_count and participant_count ignore hidden posts;
 * - user.comment_count and user.discussion_count include hidden items.
 */
class MassActionEventsTest extends TestCase
{
    use RetrievesAuthorizedUsers;
    use BinFixtures;

    /** @var array<int, array{string, int|null}> */
    public static array $events = [];

    protected function setUp(): void
    {
        parent::setUp();

        self::$events = [];

        $this->extension('walsgit-recycle-bin');

        $record = fn (string $name, string $property) => function ($event) use ($name, $property) {
            self::$events[] = [$name, $event->actor?->id, $event->$property->id];
        };

        $this->extend(
            (new Extend\Event())
                ->listen(DiscussionRestored::class, $record('discussion.restored', 'discussion'))
                ->listen(DiscussionDeleted::class, $record('discussion.deleted', 'discussion'))
                ->listen(PostRestored::class, $record('post.restored', 'post'))
                ->listen(PostDeleted::class, $record('post.deleted', 'post'))
        );

        $this->prepareDatabase([
            'users' => [
                array_merge($this->normalUser(), ['comment_count' => 2, 'discussion_count' => 1]), // id 2
            ],
        ]);
    }

    private function massAction(string $type, string $action, array $ids): ResponseInterface
    {
        $response = $this->send(
            $this->request('POST', "/api/recycle-bin/mass-$type", [
                'authenticatedAs' => 1,
                'json' => ['action' => $action, 'ids' => $ids],
            ])
        );

        $this->assertEquals(200, $response->getStatusCode(), (string) $response->getBody());

        return $response;
    }

    private function discussionRow(int $id): object
    {
        return $this->database()->table('discussions')->where('id', $id)->first();
    }

    private function userRow(int $id): object
    {
        return $this->database()->table('users')->where('id', $id)->first();
    }

    /**
     * Discussion 2 (visible, by user 2) with a visible post 1 and a hidden post 2.
     */
    private function prepareDiscussionWithHiddenPost(): void
    {
        $this->prepareDatabase([
            'discussions' => [
                ['last_post_id' => 1, 'last_post_number' => 1, 'comment_count' => 1, 'participant_count' => 1]
                    + $this->discussionData(2, false, 2),
            ],
            'posts' => [
                $this->postData(1, 2, false, 'comment', '<t>Visible</t>', 2),
                $this->postData(2, 2, true, 'comment', '<t>Hidden</t>', 2),
            ],
        ]);
    }

    #[Test]
    public function restoring_a_post_refreshes_the_discussion_metadata(): void
    {
        $this->prepareDiscussionWithHiddenPost();

        $this->massAction('posts', 'restore', [2]);

        $discussion = $this->discussionRow(2);
        $this->assertEquals(2, $discussion->comment_count);
        $this->assertEquals(2, $discussion->last_post_id);
        $this->assertEquals(2, $discussion->last_post_number);
        $this->assertEquals(1, $discussion->participant_count);
    }

    #[Test]
    public function deleting_a_hidden_post_refreshes_the_user_counter(): void
    {
        $this->prepareDiscussionWithHiddenPost();

        $this->massAction('posts', 'delete', [2]);

        $this->assertFalse($this->postExists(2));
        $this->assertTrue($this->discussionExists(2));
        $this->assertEquals(1, $this->userRow(2)->comment_count);
        // The hidden post was not counted by the discussion
        $this->assertEquals(1, $this->discussionRow(2)->comment_count);
    }

    #[Test]
    public function deleting_the_only_post_removes_the_empty_discussion(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, false, 2)],
            'posts' => [$this->postData(1, 2, true, 'comment', '<t>Only post</t>', 2)],
        ]);

        $this->massAction('posts', 'delete', [1]);

        $this->assertFalse($this->postExists(1));
        $this->assertFalse($this->discussionExists(2));
    }

    #[Test]
    public function deleting_a_discussion_refreshes_the_user_counters(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, true, 2)],
            'posts' => [$this->postData(1, 2, false, 'comment', '<t>Post</t>', 2)],
        ]);

        $this->massAction('discussions', 'delete', [2]);

        $this->assertFalse($this->discussionExists(2));
        $user = $this->userRow(2);
        $this->assertEquals(0, $user->discussion_count);
        $this->assertEquals(0, $user->comment_count);
    }

    #[Test]
    public function listeners_receive_the_events_with_the_actor(): void
    {
        $this->prepareDatabase([
            'discussions' => [
                $this->discussionData(2, true, 2),
                $this->discussionData(3, true, 2),
                $this->discussionData(4, false, 2),
            ],
            'posts' => [
                $this->postData(1, 4, true, 'comment', '<t>Hidden</t>', 2),
                $this->postData(2, 4, true, 'comment', '<t>Hidden</t>', 2),
                $this->postData(3, 4, false, 'comment', '<t>Visible</t>', 2),
            ],
        ]);

        $this->massAction('discussions', 'restore', [2]);
        $this->massAction('discussions', 'delete', [3]);
        $this->massAction('posts', 'restore', [1]);
        $this->massAction('posts', 'delete', [2]);

        // Every event carries the admin who ran the mass action
        $this->assertContains(['discussion.restored', 1, 2], self::$events);
        $this->assertContains(['discussion.deleted', 1, 3], self::$events);
        $this->assertContains(['post.restored', 1, 1], self::$events);
        $this->assertContains(['post.deleted', 1, 2], self::$events);
    }
}
