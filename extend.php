<?php

/*
 * This file is part of walsgit/recycle-bin.
 *
 * Copyright (c) 2024 Wa!id.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Walsgit\RecycleBin;

use Flarum\Extend;
use Walsgit\RecycleBin\Api\Controller\StatisticsController;
use Walsgit\RecycleBin\Api\Controller\MassActionController;
use Walsgit\RecycleBin\Filter\HiddenPostFilter;
use Walsgit\RecycleBin\Filter\ContentPostFilter;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\Routes('api'))
        ->get('/recycle-bin/statistics', 'recycle-bin.statistics', StatisticsController::class)
        ->post('/recycle-bin/mass-{type}', 'recycle-bin.mass-action', MassActionController::class),
    (new Extend\SearchDriver(\Flarum\Search\Database\DatabaseSearchDriver::class))
        ->addFilter(\Flarum\Post\Filter\PostSearcher::class, HiddenPostFilter::class)
        ->addFilter(\Flarum\Post\Filter\PostSearcher::class, ContentPostFilter::class),
];
