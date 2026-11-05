<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;

/**
 * Admin-only `filter[recycleBinHidden]` on the discussion search.
 *
 * Unlike the core `is:hidden` gambit, it does not include the visible discussions
 * without comments: only discussions with `hidden_at` set belong to the bin.
 *
 * @implements FilterInterface<DatabaseSearchState>
 */
class HiddenDiscussionFilter implements FilterInterface
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
            $state->getQuery()->whereNotNull('discussions.hidden_at');
        } else {
            $state->getQuery()->whereNull('discussions.hidden_at');
        }
    }
}
