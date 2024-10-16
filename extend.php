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
use Walsgit\RecycleBin\Api\Controller\DiscussionStatisticsController;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\Routes('api'))
        ->get('/recycle-bin/discussion-statistics', 'recycle-bin.discussion-statistics', DiscussionStatisticsController::class),
];
