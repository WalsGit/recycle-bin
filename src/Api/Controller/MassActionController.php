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

        $routeParams = (array) $request->getAttribute('routeParameters', []);
        $type = (string) ($routeParams['type'] ?? '');

        $action = (string) ($data['action'] ?? '');
        $ids = array_values(array_unique(array_filter(
            array_map('intval', array_filter((array) ($data['ids'] ?? []), 'is_scalar')),
            fn (int $id) => $id > 0
        )));

        $all = filter_var($data['all'] ?? false, FILTER_VALIDATE_BOOLEAN);

        $count = $this->bus->dispatch(
            new ProcessMassAction($actor, $type, $action, $ids, $all)
        );

        return new JsonResponse([
            'success'         => true,
            'type'            => $type,
            'action'          => $action,
            'processed_count' => $count,
        ]);
    }
}
