<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;

class HiddenPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'hidden';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        if ($negate) {
            $state->getQuery()->whereNull('posts.hidden_at'); 
        } else {
            $state->getQuery()->whereNotNull('posts.hidden_at');
            }
    }
}
