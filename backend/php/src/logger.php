<?php
require '../vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// Создайте экземпляр логгера
$log = new Logger('my_logger');

// Создайте обработчик для записи логов в файл
$logFilePath = __DIR__ . '/app.log'; // Путь к файлу логов
$log->pushHandler(new StreamHandler($logFilePath, Logger::DEBUG));

return $log;
?>
