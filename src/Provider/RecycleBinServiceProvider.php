<?php

namespace Walsgit\RecycleBin\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Walsgit\RecycleBin\Log\DeletionLogger;

class RecycleBinServiceProvider extends AbstractServiceProvider
{
    public function register(): void
    {
        // One instance, shared by the event listener and the mass action handler
        $this->container->singleton(DeletionLogger::class);
    }
}
