<?php

namespace Walsgit\RecycleBin\Api\Controller;

use Flarum\Http\RequestUtil;
use Flarum\Post\PostRepository;
use Illuminate\Database\ConnectionInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class MassPostsController implements RequestHandlerInterface
{
    public function __construct(
        protected PostRepository $posts,
        protected ConnectionInterface $db
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $data = $request->getParsedBody();
        $action = $data['action'] ?? null;
        $ids =  (array) ($data['ids'] ?? []);

        if (empty($ids) || ! in_array($action, ['restore', 'delete'], true)) {
            return new JsonResponse(['error' => 'Invalid parameters'], 400);
        }

        $count = 0;

        $this->db->transaction(function () use ($ids, $action, &$count) {
            $postModels = $this->posts->query()->whereIn('id', $ids)->get();

            foreach ($postModels as $post) {
                if ($action === 'restore') {
                    $post->hidden_at = null;
                    $post->hidden_user_id = null;
                    $post->save();
                    $count++;
                } elseif ($action === 'delete') {
                    $post->delete();
                    $count++;
                }
            }
        });

        return new JsonResponse([
            'success'           => true,
            'action'            => $action,
            'processed_count'   => $count,
        ]);
    }
}
