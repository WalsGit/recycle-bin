<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;

/**
 * Admin-only `filter[recycleBinContent]` on the post search: the content contains the given text.
 */
class ContentPostFilter implements FilterInterface
{
    /**
     * Character used to escape the LIKE wildcards. Unlike a backslash, it needs no
     * special handling per database driver, and SQLite has no default escape character.
     */
    private const LIKE_ESCAPE = '!';

    public function getFilterKey(): string
    {
        return 'recycleBinContent';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        if (! $state->getActor()->isAdmin()) {
            return;
        }

        if (is_array($value)) {
            return;
        }

        $query = $state->getQuery();
        $operator = $negate ? 'not like' : 'like';
        $escape = self::LIKE_ESCAPE;
        $escapedValue = str_replace([$escape, '%', '_'], [$escape . $escape, $escape . '%', $escape . '_'], $value);

        // Wrapping through the grammar applies the table prefix
        $column = $query->getQuery()->getGrammar()->wrap('posts.content');

        $query->whereRaw(
            "{$column} {$operator} ? escape '" . self::LIKE_ESCAPE . "'",
            ["%{$escapedValue}%"]
        );
    }
}
