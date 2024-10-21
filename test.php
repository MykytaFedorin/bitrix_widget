<?php
require_once 'src/Resume.php';
require_once 'src/BitrixAPI.php';

use App\Models\Resume;
use App\Services\BitrixAPI;

function getCV(string $vacancyDescription): Resume {
    try {
        $cvList = BitrixAPI::searchCV($vacancyDescription);
    } catch (Exception $e) {
        error_log("API Error: " . $e->getMessage());
        return generateDemoCV();
    }

    if (empty($cvList)) {
        return generateDemoCV();
    } else {
        return new Resume($cvList[0]->name, $cvList[0]->skills, $cvList[0]->experience);
    }
}

function generateDemoCV(): Resume {
    return new Resume("Демо Имя", "Навыки: PHP, MySQL", "Опыт: 5 лет");
}

$resume = getCV("Описание вакансии");
echo $resume->name;
?>

