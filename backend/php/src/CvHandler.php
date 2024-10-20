<?php
require '../vendor/autoload.php'; 
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
require 'chatgpt.php';

function getAllCvInfo() {
    $log = require 'logger.php';

    $webhookUrl = $_ENV["BITRIX_BASE_URL"] . "disk.folder.getchildren?id=93";
    $log->debug($webhookUrl);
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
        $log->debug("Download url is " . $downloadUrl);
        if ($currentRating > $highestRating) {
            $highestRating = $currentRating;
            $bestCandidate = [
                'fileName' => $fileName,
                'rating' => $currentRating,
                'downloadUrl' => $downloadUrl
            ];
        }
    }
    $log->debug("Best candidate: " . $bestCandidate["downloadUrl"]);
    return $bestCandidate;
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
        $log->debug("Загрузка файла " . $fileName . " с url " . $downloadUrl); 
        $ch = curl_init($downloadUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);

        $fileData = curl_exec($ch);
        
        if (curl_errno($ch)) {
            $log->debug('Ошибка чтения файла ' . $fileName . ': ' . curl_error($ch) . PHP_EOL);
        } else {
            # file_put_contents($fileName, $fileData);
            $log->debug($fileData); 
            $rating[$fileName] = [rateCv($fileData, $posDescription), $downloadUrl];
            $log->debug('Файл ' . $fileName . ' успешно прочитан.' . PHP_EOL);
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
                "Ответ напиши коротко, одной цифрой. Обращай внимание на скиллы которые есть у кандидата, если нет скиллов предполагаемых для этой должности, то не завышай оценку.";
    return (int)askGPT($question); 
}
