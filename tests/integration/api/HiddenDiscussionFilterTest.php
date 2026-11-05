<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Walsgit\RecycleBin\Tests\integration\BinFixtures;

/**
 * The `recycleBinHidden` filter registered on the core discussion search.
 */
class HiddenDiscussionFilterTest extends TestCase
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
                // Visible but without comment: the core `is:hidden` gambit would list it
                ['comment_count' => 0] + $this->discussionData(4, false),
            ],
        ]);
    }

    /**
     * Query discussions with a filter and return the sorted ids
     *
     * @param array<string, string> $filter
     * @return array<int>
     */
    private function searchDiscussionIds(array $filter, ?int $actorId): array
    {
        $options = $actorId !== null ? ['authenticatedAs' => $actorId] : [];

        $response = $this->send(
            $this->request('GET', '/api/discussions', $options)->withQueryParams([
                'filter' => $filter,
                'page' => ['limit' => 50],
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $ids = array_map(fn (array $discussion) => (int) $discussion['id'], $body['data']);
        sort($ids);

        return $ids;
    }

    #[Test]
    public function admin_lists_only_hidden_discussions(): void
    {
        $this->assertEquals([1, 2], $this->searchDiscussionIds(['recycleBinHidden' => 'true'], 1));
    }

    #[Test]
    public function hidden_filter_honours_its_value(): void
    {
        $this->assertEquals([3, 4], $this->searchDiscussionIds(['recycleBinHidden' => 'false'], 1));
    }

    #[Test]
    public function non_admin_does_not_see_hidden_discussions(): void
    {
        $ids = $this->searchDiscussionIds(['recycleBinHidden' => 'true'], 2);

        $this->assertNotContains(1, $ids);
        $this->assertNotContains(2, $ids);
    }

    #[Test]
    public function guest_does_not_see_hidden_discussions(): void
    {
        $ids = $this->searchDiscussionIds(['recycleBinHidden' => 'true'], null);

        $this->assertNotContains(1, $ids);
        $this->assertNotContains(2, $ids);
    }
}
