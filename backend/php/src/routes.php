<?php
use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require 'CvHandler.php';

return function (App $app) {
    $app->add(function (Request $request, $handler) {
        $response = $handler->handle($request);
        $origin = $request->getHeaderLine('Origin') ?: '*';

        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    });

    $app->options('/{routes:.+}', function (Request $request, Response $response) {
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });

    $app->post('/cv/find', function (Request $request, Response $response) use ($app){
        $body = $request->getBody();
        $parsedBody = json_decode($body, true);
        $description = $parsedBody['description'];
        $AllCvInfo = getAllCvInfo();
        getCandidate($AllCvInfo, $description);
        $response->getBody()->write(json_encode(['message' => "success"]));
        return $response->withHeader('Content-Type', 'application/json');
    });
};
?>
