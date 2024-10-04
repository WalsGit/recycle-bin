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
use Flarum\Frontend\Document;
use Flarum\Discussion\Discussion;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\Frontend('admin'))
        ->content(function (Document $document) {
            // Compter le nombre total de discussions
            $totalDiscussions = Discussion::count();

            // Compter le nombre de discussions cachées
            $hiddenDiscussions = Discussion::whereNotNull('hidden_at')->count();

            // Ajouter les statistiques au payload de l'admin
            $document->payload['modelStatistics']['discussions'] = [
                'total' => $totalDiscussions,
                'hidden' => $hiddenDiscussions,
            ];
        }),
];
