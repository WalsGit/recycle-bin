<?php

namespace Walsgit\RecycleBin\Api\Controller;

use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Bus\Dispatcher;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Walsgit\RecycleBin\Command\ProcessMassAction;

class MassActionController implements RequestHandlerInterface
{
    public function __construct(
        protected Dispatcher $bus
    ){
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $data = (array) $request->getParsedBody();

        $action = (string) ($data['action'] ?? '');
        $ids = array_values(array_unique(array_filter(
            array_map('intval', array_filter((array) ($data['ids'] ?? []), 'is_scalar')),
            fn (int $id) => $id > 0
        )));

        // Resolve type from body parameter or URI fallback
        $type = $data['type'] ?? $request->getAttribute('type');
        if (!$type) {
            $path = $request->getUri()->getPath();
            if (str_contains($path, 'discussions')) {
                $type = 'discussions';
            } elseif (str_contains($path, 'posts')) {
                $type = 'posts';
            }
        }

        $count = $this->bus->dispatch(
            new ProcessMassAction($actor, (string) $type, $action, $ids)
        );

        return new JsonResponse([
            'success'           => true,
            'type'              => $type,
            'action'            => $action,
            'processed_count'   => $count,
        ]);
    }
}
