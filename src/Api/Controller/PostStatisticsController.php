<?php

namespace Walsgit\RecycleBin\Api\Controller;

use Flarum\Http\RequestUtil;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Post\PostRepository;

class PostStatisticsController implements RequestHandlerInterface
{
    public function __construct(protected PostRepository $posts)
    {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();
        
        $hiddenCount = $this->posts->query()->whereNotNull('hidden_at')->count();

        return new JsonResponse(['hidden_posts_count' => $hiddenCount]);
    }
}
