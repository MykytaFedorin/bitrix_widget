<?php
require '../vendor/autoload.php'; 
use Dotenv\Dotenv;

function getAllFiles() {
    // Загружаем переменные окружения из файла .env
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    // Формируем URL для запроса
    $webhookUrl = $_ENV["BITRIX_BASE_URL"] . "disk.folder.getchildren?id=3";

    $ch = curl_init();

    // Устанавливаем параметры CURL
    curl_setopt($ch, CURLOPT_URL, $webhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Возвращаем ответ как строку
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
    ]);

    // Выполняем запрос
    $response = curl_exec($ch);

    // Проверяем наличие ошибок
    if (curl_errno($ch)) {
        echo 'Ошибка: ' . curl_error($ch);
        return null; // Возвращаем null в случае ошибки
    } else {
        $result = json_decode($response, true);
        if (isset($result['error'])) {
            echo 'Ошибка API: ' . $result['error_description'];
            return null; // Возвращаем null в случае ошибки API
        } else {
            return $result['result']; // Возвращаем результат
        }
    }

    curl_close($ch);
}

function downloadAllFiles($jsonResponse){

// Декодируем JSON
$data = json_decode($jsonResponse, true);

// Проверяем наличие ошибок при декодировании
if (json_last_error() !== JSON_ERROR_NONE) {
    die('Ошибка при декодировании JSON: ' . json_last_error_msg());
}

// Перебираем результат и скачиваем файлы
foreach ($data['result'] as $file) {
    $downloadUrl = $file['DOWNLOAD_URL'];
    $fileName = basename($file['NAME']);

    // Скачиваем файл
    $ch = curl_init($downloadUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);

    $fileData = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo 'Ошибка скачивания файла ' . $fileName . ': ' . curl_error($ch) . PHP_EOL;
    } else {
        // Сохраняем файл
        file_put_contents($fileName, $fileData);
        echo 'Файл ' . $fileName . ' успешно скачан.' . PHP_EOL;
    }

    curl_close($ch);
}

}

