<?php

namespace Walsgit\RecycleBin\Api\Controller;

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
        $hiddenCount = $this->posts->query()->whereNotNull('hidden_at')->count();

        return new JsonResponse(['hidden_posts_count' => $hiddenCount]);
    }
}
