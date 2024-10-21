<?php
require '../vendor/autoload.php'; 
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
require 'chatgpt.php';


function generateCv($description){
    $log = require 'logger.php';
    $file = file_get_contents("cv.txt", "r");
    $query = "Сгенерируй резюме по вот такому шаблону: '"
            . $file .
            "', которое бы подходило под вакансию " . $description .
            ". Все факты о кандидате, кроме скиллов, должны быть вымышленные и не должны совпадать с данными из того резюме, которое я тебе отправил";
    
    $log->info("Запрос к GPT: " . $query);
    return askGPT($query);
}


function getAllCvInfo() {
    $log = require 'logger.php';

    $webhookUrl = $_ENV["BITRIX_BASE_URL"] . "disk.folder.getchildren?id=93";
    $log->info("Запрос к Битрикс: " . $webhookUrl);
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $webhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Ошибка: ' . curl_error($ch);
        return null; 
    } else {
        $result = json_decode($response, true);
        if (isset($result['error'])) {
            echo 'Ошибка API: ' . $result['error_description'];
            return null; 
        } else {
            return $response; 
        }
    }

    curl_close($ch);
}

function findBestCandidate($candidates){
    $log = require 'logger.php';
    $bestCandidate = null;
    $highestRating = -1; 

    foreach ($candidates as $fileName => $data) {
        $currentRating = $data[0]; 
        $downloadUrl = $data[1];   
        $log->info("Ссылка для скачивания резюме: " . $downloadUrl);
        if ($currentRating > $highestRating) {
            $highestRating = $currentRating;
            $bestCandidate = [
                'fileName' => $fileName,
                'rating' => $currentRating,
                'downloadUrl' => $downloadUrl
            ];
        }
    }
    $log->info("Лучший кандидат: " . $bestCandidate["downloadUrl"]);
    return $bestCandidate['rating'] > 5 ? $bestCandidate : null;
}

function getCandidate($AllCvInfo, $posDescription){
    $rating = [];
    $log = require 'logger.php';

    $AllCvInfoDecode = json_decode($AllCvInfo, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        die('Ошибка при декодировании JSON: ' . json_last_error_msg());
    }

    foreach ($AllCvInfoDecode['result'] as $cv) {
        $downloadUrl = $cv['DOWNLOAD_URL'];
        $fileName = basename($cv['NAME']);
        $log->info("Загрузка файла: " . $fileName . " с URL: " . $downloadUrl); 
        $ch = curl_init($downloadUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);

        $fileData = curl_exec($ch);
        
        if (curl_errno($ch)) {
            $log->info('Ошибка при чтении файла ' . $fileName . ': ' . curl_error($ch));
        } else {
            $log->info('Содержимое файла: ' . $fileData); 
            $rating[$fileName] = [rateCv($fileData, $posDescription), $downloadUrl];
            $log->info('Файл ' . $fileName . ' успешно прочитан.');
        }

        curl_close($ch);
    }
    return findBestCandidate($rating);
}

function rateCv($cv, $position){
    $question = "Я HR. Мне нужно закрыть вакансию " 
                . $position .
                ". Оцени вот это резюме от 1 до 10."
                . $cv .
                "Ответ напиши коротко, одной цифрой. Обращай внимание на скиллы, которые есть у кандидата, если нет скиллов, предполагаемых для этой должности, то не завышай оценку.";
    return (int)askGPT($question); 
}

