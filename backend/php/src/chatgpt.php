<?php
function askGPT($question){
    $log = require 'logger.php';
    $log->info("Отправляем запрос к ChatGPT с вопросом: " . $question);

    $apiKey = $_ENV["OPENAI_API_KEY"];
    $log->info("Получаем API ключ для ChatGPT");

    $client = OpenAI::client($apiKey);
    $log->info("Создаем клиента OpenAI с переданным ключом");

    try {
        $result = $client->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'user', 'content' => $question],
            ],
        ]);
        $log->info("Запрос к ChatGPT успешно выполнен");

        $rating = $result->choices[0]->message->content;
        $log->info("Ответ ChatGPT: " . $rating);
    } catch (Exception $e) {
        $log->error("Ошибка при запросе к ChatGPT: " . $e->getMessage());
        return "Ошибка: не удалось получить ответ от ChatGPT";
    }

    $log->info("Возвращаем полученный ответ от ChatGPT");
    return $rating;
}
?>

