<?php
require '../vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$log = new Logger('my_logger');

$logFilePath = __DIR__ . '/app.log'; 
$log->pushHandler(new StreamHandler($logFilePath, Logger::DEBUG));

return $log;
?>
