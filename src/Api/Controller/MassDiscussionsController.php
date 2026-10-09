<?php

namespace Walsgit\RecycleBin\Api\Controller;

use Flarum\Discussion\DiscussionRepository;
use Flarum\Http\RequestUtil;
use Illuminate\Database\ConnectionInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class MassDiscussionsController implements RequestHandlerInterface
{
    public function __construct(
        protected DiscussionRepository $discussions,
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
            $discussionModels = $this->discussions->query()->whereIn('id', $ids)->get();

            foreach ($discussionModels as $discussion) {
                if ($action === 'restore') {
                    $discussion->hidden_at = null;
                    $discussion->hidden_user_id = null;
                    $discussion->save();
                    $count++;
                } elseif ($action === 'delete') {
                    $discussion->delete();
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
