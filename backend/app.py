from fastapi import FastAPI, Request, UploadFile, File, Form
from loguru import logger
from fastapi.middleware.cors import CORSMiddleware
from chatgpt import create_letter
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


@app.post("/cover_letter/generate")
async def upload_file(file: UploadFile = File(...),
                      description: str = Form(...)): 
    cv = await file.read() 
    letter = create_letter(cv.decode("utf-8"), description)
    return letter
