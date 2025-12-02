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
        $state->getQuery()->where('posts.hidden_at', $negate ? '=' : '!=', null);
    }
}