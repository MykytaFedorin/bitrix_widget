<?php
use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require 'CvHandler.php';
$log = require 'logger.php'; // Подключаем логгер

return function (App $app) use ($log) {
    $app->add(function (Request $request, $handler) use ($log) {
        $response = $handler->handle($request);
        $origin = $request->getHeaderLine('Origin') ?: '*';

        $log->info("Получен запрос от источника: " . $origin);

        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    });

    $app->options('/{routes:.+}', function (Request $request, Response $response) use ($log) {
        $log->info("Получен OPTIONS запрос на маршрут: " . $request->getUri()->getPath());

        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });

    $app->post('/cv/find', function (Request $request, Response $response) use ($app, $log) {
        $log->info("Получен POST запрос на маршрут /cv/find");

        $body = $request->getBody();
        $parsedBody = json_decode($body, true);

        if (!$parsedBody || !isset($parsedBody['description'])) {
            $log->error("Неправильный формат данных в запросе");
            return $response->withStatus(400)->write("Ошибка: неправильный формат данных");
        }

        $description = $parsedBody['description'];
        $log->info("Описание вакансии: " . $description);

        $AllCvInfo = getAllCvInfo();
        $log->info("Получена информация о всех резюме");

        $candidate = getCandidate($AllCvInfo, $description);

        if ($candidate) {
            $log->info("Найден лучший кандидат: " . $candidate['fileName']);
            $response->getBody()->write(json_encode($candidate));
            return $response->withHeader('Content-Type', 'application/json');
        } else {
            $log->info("Кандидат не найден, генерация нового резюме");
            $cv = generateCv($description);
            $response->getBody()->write(json_encode($cv));
            return $response->withHeader('Content-Type', 'application/json');
        }
    });
};
?>
