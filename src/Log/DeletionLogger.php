<?php

namespace Walsgit\RecycleBin\Log;

use Flarum\Foundation\Paths;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Level;
use Monolog\Logger;
use Psr\Log\LoggerInterface;
use Throwable;

/**
 * Audit log of the permanent deletions made from the recycle bin.
 *
 * It writes one line per entry (timestamp, message, JSON details) to
 * `storage/logs/recycle-bin/recycle-bin-deletions-YYYY-MM-DD.log`.
 * A new file is started with the first line of a new day, and only the MAX_FILES most
 * recent files are kept (days without deletions have no file, so this can span more
 * than MAX_FILES days). Older files are removed at that moment, so no cron or queue
 * is needed.
 *
 * Writing the log must never prevent a deletion: failures are reported to the
 * general Flarum log instead.
 */
class DeletionLogger
{
    public const SETTING = 'walsgit-recycle-bin.deletion_log';

    private const MAX_FILES = 15;

    private ?Logger $logger = null;

    private bool $itemLogsSuspended = false;

    public function __construct(
        protected Paths $paths,
        protected SettingsRepositoryInterface $settings,
        protected LoggerInterface $fallbackLogger
    ) {
    }

    public function isEnabled(): bool
    {
        return (bool) $this->settings->get(self::SETTING, false);
    }

    /**
     * Run a mass action without the per-item lines: it writes one summary line instead.
     *
     * @template T
     *
     * @param callable(): T $callback
     *
     * @return T
     */
    public function withoutItemLogs(callable $callback): mixed
    {
        $previous = $this->itemLogsSuspended;
        $this->itemLogsSuspended = true;

        try {
            return $callback();
        } finally {
            $this->itemLogsSuspended = $previous;
        }
    }

    /**
     * Log the permanent deletion of one item (outside of a mass action).
     *
     * @param array<string, mixed> $details
     */
    public function logItem(string $type, int $id, ?User $actor, array $details = []): void
    {
        if ($this->itemLogsSuspended) {
            return;
        }

        $this->write("$type deleted", ['id' => $id] + $details, $actor);
    }

    /**
     * Log a mass deletion as a single summary line.
     *
     * @param array<string, mixed> $details
     */
    public function logMassAction(User $actor, array $details): void
    {
        $this->write('mass delete', $details, $actor);
    }

    /**
     * @param array<string, mixed> $context
     */
    private function write(string $message, array $context, ?User $actor): void
    {
        if (! $this->isEnabled()) {
            return;
        }

        try {
            $this->logger()->info($message, [
                'actor_id' => $actor?->id,
                'actor_username' => $actor?->username,
            ] + $context);
        } catch (Throwable $e) {
            $this->fallbackLogger->warning('Recycle bin: could not write the deletion log: ' . $e->getMessage());
        }
    }

    private function logger(): Logger
    {
        if ($this->logger === null) {
            $handler = new RotatingFileHandler(
                $this->paths->storage . '/logs/recycle-bin/recycle-bin-deletions.log',
                self::MAX_FILES,
                Level::Info
            );
            // [2026-11-05 19:21:40] recycle-bin.INFO: discussion deleted {"actor_id":1,...}
            $handler->setFormatter(new LineFormatter(
                "[%datetime%] %channel%.%level_name%: %message% %context%\n",
                'Y-m-d H:i:s',
                false,
                true
            ));

            $this->logger = new Logger('recycle-bin', [$handler]);
        }

        return $this->logger;
    }
}
