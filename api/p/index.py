from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio
import json

app = FastAPI()

async def stream_data():
    for i in range(1, 5):
        yield json.dumps({"message": i}) + "\n"
        print({"message": i})
        await asyncio.sleep(1)

@app.get("/api/p/python")
async def hello_world():
    print("starting the stream...")
    return StreamingResponse(stream_data(), media_type="application/json")