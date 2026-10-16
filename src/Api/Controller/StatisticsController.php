<?php

namespace Walsgit\RecycleBin\Api\Controller;

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

        return new JsonResponse([
            'hidden_discussions_count' => $this->discussions->query()->whereNotNull('hidden_at')->count(),
            'hidden_posts_count'       => $this->posts->query()->whereNotNull('hidden_at')->where('type', 'comment')->count(),
        ]);
    }
}
