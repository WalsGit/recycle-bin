<?php

namespace Walsgit\RecycleBin\Api\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Discussion\DiscussionRepository;

class DiscussionStatisticsController implements RequestHandlerInterface
{
    protected $discussions;

    public function __construct(DiscussionRepository $discussions)
    {
        $this->discussions = $discussions;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $hiddenCount = $this->discussions->query()->whereNotNull('hidden_at')->count();

        return new JsonResponse(['hidden_discussions_count' => $hiddenCount]);
    }
}
