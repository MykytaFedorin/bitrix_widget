<?php
function test(){
    $log = require 'logger.php';
    $apiKey = $_ENV["OPENAI_API_KEY"];
    $log->debug($apiKey);
    $client = OpenAI::client($apiKey);

    $result = $client->chat()->create([
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'user', 'content' => 'Hello!'],
        ],
    ]);

    $log->debug($result->choices[0]->message->content);
}
?>
