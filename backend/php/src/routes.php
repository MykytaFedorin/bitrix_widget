<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (App $app) {
    $app->add(function (Request $request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });

    $app->options('/{routes:.+}', function (Response $response) {
        return $response;
    });

    $app->get('/hello/{name}', function (Request $request, Response $response, $args) {
        $name = $args['name'];
        $response->getBody()->write("Hello, $name");
        return $response;
    });

    $app->post('/data', function (Request $request, Response $response) {
        $data = $request->getParsedBody();
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/cv/generate', function (Request $request, Response $response) {
        if ($request->getUploadedFiles()) {
            $uploadedFiles = $request->getUploadedFiles();
            $file = $uploadedFiles['file'] ?? null;

            if ($file && $file->getError() === UPLOAD_ERR_OK) {
                $uploadFilePath = __DIR__ . '/' . $file->getClientFilename();

                // Перемещаем загруженный файл
                $file->moveTo($uploadFilePath);
                
                $response->getBody()->write(json_encode(['message' => 'File uploaded successfully']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
            } else {
                $response->getBody()->write(json_encode(['message' => 'File upload failed']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
            }
        } else {
            $response->getBody()->write(json_encode(['message' => 'No file uploaded']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    });
};

