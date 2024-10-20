<?php
function askGPT($question){
    $log = require 'logger.php';
    $apiKey = $_ENV["OPENAI_API_KEY"];
    $client = OpenAI::client($apiKey);

    $result = $client->chat()->create([
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'user', 'content' => $question],
        ],
    ]);
    $rating = $result->choices[0]->message->content;
    $log->debug("ChatGPT response: " . $rating);
    return $rating;
}
?>
