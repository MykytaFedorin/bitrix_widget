from fastapi import FastAPI, Request, UploadFile, File, Form
from loguru import logger
from fastapi.middleware.cors import CORSMiddleware
from chatgpt import create_letter

# Настройка логирования
logger.remove()  # Удаляем стандартный логгер
logger.add("logs.log", level="INFO")  # Логируем только инфо и выше

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

@app.post("/bitrix_handler")
async def bitrix_handler(request: Request):
    logger.info("Получен запрос на /bitrix_handler")
    
    try:
        data = await request.json()
        logger.info(f"Данные запроса: {data}")
    except Exception as e:
        logger.error(f"Ошибка при получении данных: {e}")
        return {"status": "error", "message": "Ошибка получения данных"}

    logger.info("Запрос успешно обработан")
    return {"status": "success"}

@app.post("/cover_letter/generate")
async def upload_file(file: UploadFile = File(...),
                      description: str = Form(...)):
    logger.info("Получен запрос на генерацию сопроводительного письма")

    try:
        cv = await file.read()
        logger.info(f"Резюме загружено: {file.filename} (размер: {len(cv)} байт)")
    except Exception as e:
        logger.error(f"Ошибка при чтении файла резюме: {e}")
        return {"status": "error", "message": "Ошибка чтения файла"}

    logger.info(f"Описание вакансии: {description}")

    try:
        letter = create_letter(cv.decode("utf-8"), description)
        logger.info("Сопроводительное письмо успешно сгенерировано")
    except Exception as e:
        logger.error(f"Ошибка при генерации письма: {e}")
        return {"status": "error", "message": "Ошибка генерации письма"}

    return letter

