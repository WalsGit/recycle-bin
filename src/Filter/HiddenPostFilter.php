<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;

/**
 * Admin-only `filter[recycleBinHidden]` on the post search.
 *
 * `true` keeps the hidden comments (the content of the bin), `false` the visible ones.
 *
 * @implements FilterInterface<DatabaseSearchState>
 */
class HiddenPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'recycleBinHidden';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        if (! $state->getActor()->isAdmin()) {
            return;
        }

        if (is_array($value)) {
            return;
        }

        $hidden = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? true;

        if ($negate) {
            $hidden = ! $hidden;
        }

        if ($hidden) {
            $state->getQuery()
                ->whereNotNull('posts.hidden_at')
                ->where('posts.type', 'comment');
        } else {
            $state->getQuery()->whereNull('posts.hidden_at');
        }
    }
}
