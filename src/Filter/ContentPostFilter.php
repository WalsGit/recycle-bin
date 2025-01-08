<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;

class ContentPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'content';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $filterState->getQuery()->where('posts.content', 'like', "%$filterValue%");
    }
}