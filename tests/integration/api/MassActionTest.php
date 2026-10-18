<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

class MassActionTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('walsgit-recycle-bin');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(), // id 2, the admin (id 1) exists by default
            ],
            'discussions' => [
                $this->hiddenDiscussion(1),
            ],
        ]);
    }

    /**
     * Deleting a model fires its events, which remove related posts and notifications.
     * This per-item cleanup is intended, and bounded by MAX_ITEMS_PER_ALL_REQUEST.
     * Quote styles and table prefix vary between drivers and CI jobs, so they are built dynamically.
     */
    protected function allowedRepeatedQueries(): array
    {
        $prefix = $this->database()->getTablePrefix();
        $allowed = [];

        foreach (['notifications', 'discussions', 'posts'] as $table) {
            foreach (['"', '`'] as $quote) {
                $allowed[] = "delete from {$quote}{$prefix}{$table}{$quote}";
            }
        }

        return $allowed;
    }

    /**
     * Build the data of a hidden discussion for the test database
     */
    private function hiddenDiscussion(int $id): array
    {
        $now = Carbon::now()->toDateTimeString();

        return [
            'id' => $id,
            'title' => "Hidden discussion $id",
            'slug' => "hidden-discussion-$id",
            'created_at' => $now,
            'last_posted_at' => $now,
            'user_id' => 1,
            'comment_count' => 1,
            'hidden_at' => $now,
        ];
    }

    #[Test]
    public function non_admin_cannot_use_mass_action(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/recycle-bin/mass-discussions', [
                'authenticatedAs' => 2,
                'json' => ['action' => 'delete', 'ids' => [1]],
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());

        // The discussion must still exist
        $this->assertTrue($this->database()->table('discussions')->where('id', 1)->exists());
    }

    #[Test]
    public function admin_can_delete_selected_items(): void
    {
        $response = $this->send(
            $this->request('POST', '/api/recycle-bin/mass-discussions', [
                'authenticatedAs' => 1,
                'json' => ['action' => 'delete', 'ids' => [1]],
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $this->assertEquals(1, $body['processed_count']);
        $this->assertFalse($body['has_more']);
        $this->assertFalse($this->database()->table('discussions')->where('id', 1)->exists());
    }

    #[Test]
    public function process_all_is_limited_per_request(): void
    {
        // Discussion 1 already exists from setUp(): 500 more = 501, one above the limit
        $this->prepareDatabase([
            'discussions' => array_map(fn (int $id) => $this->hiddenDiscussion($id), range(2, 501)),
        ]);

        $first = $this->send(
            $this->request('POST', '/api/recycle-bin/mass-discussions', [
                'authenticatedAs' => 1,
                'json' => ['action' => 'delete', 'all' => true],
            ])
        );

        $firstBody = json_decode((string) $first->getBody(), true);
        $this->assertEquals(500, $firstBody['processed_count']);
        $this->assertTrue($firstBody['has_more']);

        // Second call processes the remaining item
        $second = $this->send(
            $this->request('POST', '/api/recycle-bin/mass-discussions', [
                'authenticatedAs' => 1,
                'json' => ['action' => 'delete', 'all' => true],
            ])
        );

        $secondBody = json_decode((string) $second->getBody(), true);
        $this->assertEquals(1, $secondBody['processed_count']);
        $this->assertFalse($secondBody['has_more']);
    }
}
