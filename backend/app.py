from fastapi import FastAPI, Request, UploadFile, File
from loguru import logger
from fastapi.middleware.cors import CORSMiddleware
import os
logger.remove()
logger.add("logs.log")

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
    data = await request.json()
    logger.debug(data)
    return {"status": "success"}


UPLOAD_DIRECTORY = os.getcwd()

os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/cover_letter/generate")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_location, "wb") as f:
        f.write(await file.read())  # Чтение содержимого и запись в файл

    return {"info": f"file '{file.filename}' saved at '{file_location}'"}
