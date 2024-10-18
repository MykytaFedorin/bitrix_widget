from fastapi import FastAPI, Request
from loguru import logger

logger.remove()
logger.add("logs.log")

app = FastAPI()

@app.post("/bitrix_handler")
async def bitrix_handler(request: Request):
    data = await request.json()
    logger.debug(data)
    return {"status": "success"}
