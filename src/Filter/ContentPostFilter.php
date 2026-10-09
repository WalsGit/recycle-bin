<?php

namespace Walsgit\RecycleBin\Filter;

use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;

class ContentPostFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'content';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        if (is_array($value)) {
            return;
        }
        
        $operator = $negate ? 'not like' : 'like';
        $state->getQuery()->where('posts.content', $operator, "%$value%");
    }
}
