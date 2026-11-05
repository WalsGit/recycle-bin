<?php

namespace Walsgit\RecycleBin\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;
use Walsgit\RecycleBin\Tests\integration\BinFixtures;

class DeletionLogTest extends TestCase
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
                $this->discussionData(2),
                $this->discussionData(3, false),
            ],
            'posts' => [
                $this->postData(1, 3),
                $this->postData(2, 3, false),
            ],
        ]);

        $this->clearLogs();
    }

    private function logDirectory(): string
    {
        // Not resolved through the app: settings must be defined before it boots
        return $this->tmpDir() . '/storage/logs/recycle-bin';
    }

    private function clearLogs(): void
    {
        $directory = $this->logDirectory();

        if (is_file($directory)) {
            unlink($directory);
        }

        foreach (glob("$directory/*") ?: [] as $file) {
            unlink($file);
        }

        if (is_dir($directory)) {
            rmdir($directory);
        }
    }

    private function enableLog(): void
    {
        $this->setting('walsgit-recycle-bin.deletion_log', '1');
    }

    /**
     * @return array<int, array{datetime: string, message: string, context: array<string, mixed>}> the parsed log lines
     */
    private function logLines(): array
    {
        $lines = [];

        foreach (glob($this->logDirectory() . '/recycle-bin-deletions-*.log') ?: [] as $file) {
            foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
                // [2026-11-05 19:21:40] recycle-bin.INFO: discussion deleted {"actor_id":1,...}
                $this->assertSame(
                    1,
                    preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] recycle-bin\.INFO: (.+?) (\{.*\})$/', $line, $matches),
                    "Unexpected log line format: $line"
                );

                $lines[] = [
                    'datetime' => $matches[1],
                    'message' => $matches[2],
                    'context' => json_decode($matches[3], true),
                ];
            }
        }

        return $lines;
    }

    private function massAction(string $type, array $json): ResponseInterface
    {
        return $this->send(
            $this->request('POST', "/api/recycle-bin/mass-$type", ['authenticatedAs' => 1, 'json' => $json])
        );
    }

    private function deleteItem(string $path): ResponseInterface
    {
        return $this->send($this->request('DELETE', $path, ['authenticatedAs' => 1]));
    }

    #[Test]
    public function nothing_is_logged_by_default(): void
    {
        $this->massAction('discussions', ['action' => 'delete', 'ids' => [1]]);
        $this->deleteItem('/api/discussions/2');

        $this->assertSame([], $this->logLines());
    }

    #[Test]
    public function a_mass_delete_of_a_selection_is_logged_as_one_summary(): void
    {
        $this->enableLog();

        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => [1, 2]]);

        $this->assertEquals(200, $response->getStatusCode());

        $lines = $this->logLines();
        $this->assertCount(1, $lines, 'One summary line, not one per item');
        $this->assertSame('mass delete', $lines[0]['message']);
        $this->assertSame(1, $lines[0]['context']['actor_id']);
        $this->assertSame('admin', $lines[0]['context']['actor_username']);
        $this->assertSame('discussions', $lines[0]['context']['type']);
        $this->assertSame('selection', $lines[0]['context']['mode']);
        $this->assertSame(2, $lines[0]['context']['processed']);
        $this->assertSame([1, 2], $lines[0]['context']['requested_ids']);
        $this->assertNotEmpty($lines[0]['datetime']);
    }

    #[Test]
    public function a_mass_delete_of_all_items_is_logged_with_its_marker(): void
    {
        $this->enableLog();
        $marker = Carbon::now()->addMinute()->toIso8601String();

        $this->massAction('posts', ['action' => 'delete', 'all' => true, 'hidden_before' => $marker]);

        $lines = $this->logLines();
        $this->assertCount(1, $lines);
        $this->assertSame('posts', $lines[0]['context']['type']);
        $this->assertSame('all', $lines[0]['context']['mode']);
        $this->assertSame(1, $lines[0]['context']['processed']);
        $this->assertNull($lines[0]['context']['requested_ids']);
        $this->assertNotNull($lines[0]['context']['hidden_before']);
    }

    #[Test]
    public function a_mass_restore_is_not_logged(): void
    {
        $this->enableLog();

        $this->massAction('discussions', ['action' => 'restore', 'ids' => [1, 2]]);

        $this->assertSame([], $this->logLines());
    }

    #[Test]
    public function nothing_is_logged_when_nothing_was_processed(): void
    {
        $this->enableLog();

        $this->massAction('discussions', ['action' => 'delete', 'ids' => [3]]); // not hidden

        $this->assertSame([], $this->logLines());
    }

    #[Test]
    public function a_single_hidden_discussion_deletion_is_logged(): void
    {
        $this->enableLog();

        $response = $this->deleteItem('/api/discussions/1');

        $this->assertEquals(204, $response->getStatusCode());

        $lines = $this->logLines();
        $this->assertCount(1, $lines);
        $this->assertSame('discussion deleted', $lines[0]['message']);
        $this->assertSame(1, $lines[0]['context']['id']);
        $this->assertSame('Discussion 1', $lines[0]['context']['title']);
        $this->assertSame(1, $lines[0]['context']['actor_id']);
    }

    #[Test]
    public function a_single_hidden_post_deletion_is_logged_without_its_content(): void
    {
        $this->enableLog();

        $response = $this->deleteItem('/api/posts/1');

        $this->assertEquals(204, $response->getStatusCode());

        $lines = $this->logLines();
        $this->assertCount(1, $lines);
        $this->assertSame('post deleted', $lines[0]['message']);
        $this->assertSame(1, $lines[0]['context']['id']);
        $this->assertSame(3, $lines[0]['context']['discussion_id']);
        $this->assertStringNotContainsString('Content', json_encode($lines[0]));
    }

    #[Test]
    public function deleting_a_visible_post_is_not_logged(): void
    {
        $this->enableLog();

        $this->deleteItem('/api/posts/2');

        $this->assertSame([], $this->logLines());
    }

    #[Test]
    public function a_failing_log_does_not_prevent_the_deletion(): void
    {
        $this->enableLog();

        // A regular file where the log directory should be: the log cannot be written
        $directory = $this->logDirectory();
        @mkdir(dirname($directory), 0777, true);
        file_put_contents($directory, 'not a directory');

        $response = $this->massAction('discussions', ['action' => 'delete', 'ids' => [1]]);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertFalse($this->discussionExists(1));

        unlink($directory);
    }
}
