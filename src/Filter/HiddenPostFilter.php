<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class HiddenPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'hidden';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $filterState->getQuery()->where('posts.hidden_at', $negate ? '=' : '!=', null);
    }
}