<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;
use Walsgit\RecycleBin\Tests\integration\BinFixtures;

class MassActionTest extends TestCase
{
    use RetrievesAuthorizedUsers;
    use BinFixtures;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('walsgit-recycle-bin');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(), // id 2, the admin (id 1) exists by default
            ],
            'discussions' => [
                $this->discussionData(1),
            ],
        ]);
    }

    /**
     * Send a mass action request
     *
     * @param array<string, mixed> $json
     */
    private function massAction(string $type, array $json, ?int $actorId = 1): ResponseInterface
    {
        $options = ['json' => $json];

        if ($actorId !== null) {
            $options['authenticatedAs'] = $actorId;
        }

        return $this->send($this->request('POST', "/api/recycle-bin/mass-$type", $options));
    }

    /**
     * @return array<string, mixed>
     */
    private function body(ResponseInterface $response): array
    {
        return json_decode((string) $response->getBody(), true);
    }

    #[Test]
    public function non_admin_cannot_use_mass_action(): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => [1]], 2);

        $this->assertEquals(403, $response->getStatusCode());

        // The discussion must still exist
        $this->assertTrue($this->discussionExists(1));
    }

    #[Test]
    public function guest_cannot_use_mass_action(): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => [1]], null);

        // Rejected before reaching the handler (status depends on the guest session/CSRF layer)
        $this->assertGreaterThanOrEqual(400, $response->getStatusCode());
        $this->assertTrue($this->discussionExists(1));
    }

    #[Test]
    public function admin_can_delete_selected_items(): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => [1]]);

        $this->assertEquals(200, $response->getStatusCode());

        $body = $this->body($response);
        $this->assertEquals(1, $body['processed_count']);
        $this->assertFalse($body['has_more']);
        $this->assertEquals(0, $body['remaining_count']);
        $this->assertFalse($this->discussionExists(1));
    }

    #[Test]
    public function admin_can_restore_selected_discussions(): void
    {
        $response = $this->massAction('discussions', ['action' => 'restore', 'ids' => [1]]);

        $this->assertEquals(200, $response->getStatusCode());

        $body = $this->body($response);
        $this->assertEquals(1, $body['processed_count']);
        $this->assertEquals('restore', $body['action']);
        $this->assertEquals('discussions', $body['type']);
        $this->assertTrue($this->discussionExists(1));
        $this->assertFalse($this->isHiddenDiscussion(1));
    }

    #[Test]
    public function admin_can_restore_all_discussions(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2), $this->discussionData(3)],
        ]);

        $response = $this->massAction('discussions', ['action' => 'restore', 'all' => true]);

        $body = $this->body($response);
        $this->assertEquals(3, $body['processed_count']);
        $this->assertFalse($body['has_more']);

        foreach ([1, 2, 3] as $id) {
            $this->assertFalse($this->isHiddenDiscussion($id));
        }
    }

    #[Test]
    public function admin_can_restore_selected_posts(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, false)],
            'posts' => [$this->postData(1, 2), $this->postData(2, 2)],
        ]);

        $response = $this->massAction('posts', ['action' => 'restore', 'ids' => [1]]);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $this->body($response)['processed_count']);
        $this->assertFalse($this->isHiddenPost(1));
        $this->assertTrue($this->isHiddenPost(2), 'Post not selected must stay hidden');
    }

    #[Test]
    public function admin_can_delete_selected_posts(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, false)],
            'posts' => [$this->postData(1, 2), $this->postData(2, 2)],
        ]);

        $response = $this->massAction('posts', ['action' => 'delete', 'ids' => [1]]);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $this->body($response)['processed_count']);
        $this->assertFalse($this->postExists(1));
        $this->assertTrue($this->postExists(2));
    }

    #[Test]
    public function admin_can_delete_all_posts(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, false)],
            'posts' => [$this->postData(1, 2), $this->postData(2, 2), $this->postData(3, 2, false)],
        ]);

        $response = $this->massAction('posts', ['action' => 'delete', 'all' => true]);

        $body = $this->body($response);
        $this->assertEquals(2, $body['processed_count']);
        $this->assertFalse($body['has_more']);
        $this->assertFalse($this->postExists(1));
        $this->assertFalse($this->postExists(2));
        $this->assertTrue($this->postExists(3), 'Visible post must not be deleted');
    }

    #[Test]
    public function non_hidden_items_are_ignored_when_selected(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, false)],
            'posts' => [$this->postData(1, 2, false)],
        ]);

        $discussions = $this->massAction('discussions', ['action' => 'delete', 'ids' => [2]]);
        $posts = $this->massAction('posts', ['action' => 'delete', 'ids' => [1]]);

        $this->assertEquals(0, $this->body($discussions)['processed_count']);
        $this->assertEquals(0, $this->body($posts)['processed_count']);
        $this->assertTrue($this->discussionExists(2));
        $this->assertTrue($this->postExists(1));
    }

    #[Test]
    public function non_comment_posts_are_ignored_by_process_all(): void
    {
        $this->prepareDatabase([
            'discussions' => [$this->discussionData(2, false)],
            'posts' => [
                $this->postData(1, 2),
                $this->postData(2, 2, true, 'discussionRenamed', ''),
            ],
        ]);

        $body = $this->body($this->massAction('posts', ['action' => 'delete', 'all' => true]));

        $this->assertEquals(1, $body['processed_count']);
        $this->assertFalse($this->postExists(1));
        $this->assertTrue($this->postExists(2), 'Only comment posts belong to the bin');
    }

    #[Test]
    public function invalid_type_is_rejected(): void
    {
        $response = $this->massAction('users', ['action' => 'delete', 'ids' => [1]]);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertTrue($this->discussionExists(1));
    }

    #[Test]
    public function invalid_action_is_rejected(): void
    {
        $response = $this->massAction('discussions', ['action' => 'archive', 'ids' => [1]]);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertTrue($this->isHiddenDiscussion(1));
    }

    #[Test]
    public function missing_action_is_rejected(): void
    {
        $response = $this->massAction('discussions', ['ids' => [1]]);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertTrue($this->discussionExists(1));
    }

    /**
     * @return array<string, array{array<string, mixed>}>
     */
    public static function emptySelections(): array
    {
        return [
            'no ids key' => [[]],
            'empty ids' => [['ids' => []]],
            'only invalid ids' => [['ids' => [0, -5, 'abc']]],
            'all is false' => [['ids' => [], 'all' => false]],
        ];
    }

    /**
     * @param array<string, mixed> $extra
     */
    #[Test]
    #[DataProvider('emptySelections')]
    public function empty_selection_is_rejected(array $extra): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete'] + $extra);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertTrue($this->discussionExists(1));
    }

    #[Test]
    public function more_than_100_ids_is_rejected(): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => range(1, 101)]);

        $this->assertEquals(422, $response->getStatusCode());
        $this->assertTrue($this->discussionExists(1));
    }

    #[Test]
    public function exactly_100_ids_is_accepted(): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => range(1, 100)]);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $this->body($response)['processed_count']);
    }

    #[Test]
    public function duplicate_ids_are_processed_once(): void
    {
        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => [1, 1, '1']]);

        $this->assertEquals(1, $this->body($response)['processed_count']);
    }

    #[Test]
    public function process_all_is_limited_per_request(): void
    {
        // Discussion 1 already exists from setUp(): 200 more = 201, one above the limit
        $this->prepareDatabase([
            'discussions' => array_map(fn (int $id) => $this->discussionData($id), range(2, 201)),
        ]);

        $firstBody = $this->body($this->massAction('discussions', ['action' => 'delete', 'all' => true]));

        $this->assertEquals(200, $firstBody['processed_count']);
        $this->assertTrue($firstBody['has_more']);
        $this->assertEquals(1, $firstBody['remaining_count']);
        $this->assertEquals(1, $this->database()->table('discussions')->count());

        // Second call processes the remaining item
        $secondBody = $this->body($this->massAction('discussions', ['action' => 'delete', 'all' => true]));

        $this->assertEquals(1, $secondBody['processed_count']);
        $this->assertFalse($secondBody['has_more']);
        $this->assertEquals(0, $secondBody['remaining_count']);
        $this->assertEquals(0, $this->database()->table('discussions')->count());
    }

    #[Test]
    public function process_all_on_an_empty_bin_processes_nothing(): void
    {
        $this->database()->table('discussions')->delete();

        $body = $this->body($this->massAction('discussions', ['action' => 'delete', 'all' => true]));

        $this->assertEquals(0, $body['processed_count']);
        $this->assertFalse($body['has_more']);
    }
}
