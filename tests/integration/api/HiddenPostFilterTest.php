<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Walsgit\RecycleBin\Tests\integration\BinFixtures;

/**
 * The `recycleBinHidden` and `recycleBinContent` filters registered on the core post search.
 */
class HiddenPostFilterTest extends TestCase
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
                $this->discussionData(1, false),
            ],
            'posts' => [
                $this->postData(1, 1, false, 'comment', '<t>visible apple</t>'),
                $this->postData(2, 1, true, 'comment', '<t>hidden apple</t>'),
                $this->postData(3, 1, true, 'comment', '<t>hidden banana</t>'),
                $this->postData(4, 1, true, 'discussionRenamed', ''),
            ],
        ]);
    }

    /**
     * Query posts with a filter and return the sorted ids
     *
     * @param array<string, string> $filter
     * @return array<int>
     */
    private function searchPostIds(array $filter, ?int $actorId, array $headers = []): array
    {
        $options = ['headers' => $headers];

        if ($actorId !== null) {
            $options['authenticatedAs'] = $actorId;
        }

        $response = $this->send(
            $this->request('GET', '/api/posts', $options)->withQueryParams([
                'filter' => $filter,
                'page' => ['limit' => 50],
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $body = json_decode((string) $response->getBody(), true);
        $ids = array_map(fn (array $post) => (int) $post['id'], $body['data']);
        sort($ids);

        return $ids;
    }

    #[Test]
    public function admin_can_list_hidden_comments(): void
    {
        $this->assertEquals([2, 3], $this->searchPostIds(['recycleBinHidden' => 'true'], 1));
    }

    #[Test]
    public function hidden_filter_does_not_depend_on_the_language(): void
    {
        // Regression: `is:hidden` once only worked in English
        $this->assertEquals([2, 3], $this->searchPostIds(['recycleBinHidden' => 'true'], 1, ['Accept-Language' => 'fr']));
    }

    #[Test]
    public function admin_can_search_hidden_comments_by_content(): void
    {
        $this->assertEquals([2], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => 'apple'], 1));
        $this->assertEquals([3], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => 'banana'], 1));
        $this->assertEquals([], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => 'cherry'], 1));
    }

    #[Test]
    public function content_filter_matches_visible_and_hidden_posts_alone(): void
    {
        $this->assertEquals([1, 2], $this->searchPostIds(['recycleBinContent' => 'apple'], 1));
    }

    #[Test]
    public function hidden_filter_honours_its_value(): void
    {
        $this->assertEquals([1], $this->searchPostIds(['recycleBinHidden' => 'false'], 1));
    }

    #[Test]
    public function previous_unprefixed_filters_are_not_registered(): void
    {
        // Unknown filter keys are ignored: every post visible to the admin is returned
        $this->assertEquals([1, 2, 3, 4], $this->searchPostIds(['hidden' => '1'], 1));
        $this->assertEquals([1, 2, 3, 4], $this->searchPostIds(['content' => 'banana'], 1));
    }

    #[Test]
    public function content_filter_treats_like_wildcards_literally(): void
    {
        $this->prepareDatabase([
            'posts' => [
                $this->postData(5, 1, true, 'comment', '<t>100% sure</t>'),
                $this->postData(6, 1, true, 'comment', '<t>snake_case</t>'),
                $this->postData(7, 1, true, 'comment', '<t>snakeXcase and 100 sure</t>'),
                $this->postData(8, 1, true, 'comment', '<t>bang! really</t>'),
            ],
        ]);

        $this->assertEquals([5], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => '100%'], 1));
        $this->assertEquals([6], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => 'snake_case'], 1));
        $this->assertEquals([8], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => 'bang!'], 1));
        // A bare wildcard must not match everything
        $this->assertEquals([5], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => '%'], 1));
        $this->assertEquals([6], $this->searchPostIds(['recycleBinHidden' => 'true', 'recycleBinContent' => '_'], 1));
    }

    #[Test]
    public function non_admin_does_not_see_hidden_posts(): void
    {
        $ids = $this->searchPostIds(['recycleBinHidden' => 'true'], 2);

        $this->assertNotContains(2, $ids);
        $this->assertNotContains(3, $ids);
    }

    #[Test]
    public function non_admin_cannot_search_hidden_posts_by_content(): void
    {
        $ids = $this->searchPostIds(['recycleBinContent' => 'banana'], 2);

        $this->assertNotContains(3, $ids);
    }

    #[Test]
    public function guest_does_not_see_hidden_posts(): void
    {
        $ids = $this->searchPostIds(['recycleBinHidden' => 'true'], null);

        $this->assertNotContains(2, $ids);
        $this->assertNotContains(3, $ids);
    }
}
