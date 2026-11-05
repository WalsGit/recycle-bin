<?php

namespace Walsgit\RecycleBin\Api\Controller;

use Carbon\Carbon;
use Flarum\Discussion\DiscussionRepository;
use Flarum\Http\RequestUtil;
use Flarum\Post\PostRepository;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class StatisticsController implements RequestHandlerInterface
{
    public function __construct(
        protected DiscussionRepository $discussions,
        protected PostRepository $posts
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        RequestUtil::getActor($request)->assertAdmin();

        // `query()` is deliberately not scoped by visibility: hidden items are
        // invisible to most actors, and only admins reach this point.
        return new JsonResponse([
            // Server time of these counts: "delete all" sends it back to only process what was counted
            'generated_at'             => Carbon::now()->toIso8601String(),
            'hidden_discussions_count' => $this->discussions->query()->whereNotNull('hidden_at')->count(),
            'hidden_posts_count'       => $this->posts->query()->whereNotNull('hidden_at')->where('type', 'comment')->count(),
        ]);
    }
}
