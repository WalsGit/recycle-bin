<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Walsgit\RecycleBin\Tests\integration\BinFixtures;

class StatisticsTest extends TestCase
{
    use RetrievesAuthorizedUsers;
    use BinFixtures;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('walsgit-recycle-bin');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(), // id 2
            ],
            'discussions' => [
                $this->discussionData(1),
                $this->discussionData(2),
                $this->discussionData(3, false),
            ],
            'posts' => [
                $this->postData(1, 3),
                $this->postData(2, 3),
                $this->postData(3, 3, false),
                // Hidden but not a comment: must not be counted
                $this->postData(4, 3, true, 'discussionRenamed', ''),
            ],
        ]);
    }

    #[Test]
    public function admin_gets_hidden_counts(): void
    {
        $response = $this->send(
            $this->request('GET', '/api/recycle-bin/statistics', ['authenticatedAs' => 1])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $this->assertEquals(2, $body['hidden_discussions_count']);
        $this->assertEquals(2, $body['hidden_posts_count']);

        // Server time of the counts, within a few seconds of now
        $this->assertLessThan(10, abs(strtotime($body['generated_at']) - time()));
    }

    #[Test]
    public function non_admin_cannot_get_statistics(): void
    {
        $response = $this->send(
            $this->request('GET', '/api/recycle-bin/statistics', ['authenticatedAs' => 2])
        );

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function guest_cannot_get_statistics(): void
    {
        $response = $this->send($this->request('GET', '/api/recycle-bin/statistics'));

        $this->assertContains($response->getStatusCode(), [401, 403]);
    }
}
