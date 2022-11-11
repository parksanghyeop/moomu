from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from fastapi import (
    WebSocket,
    WebSocketDisconnect,
)
from redis import Redis
import asyncio


def get_application():
    _app = FastAPI(title=settings.PROJECT_NAME)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


app = get_application()


@app.get("/")
async def root():
    return RedirectResponse("/docs")


async def receive_message(websocket: WebSocket):
    await websocket.receive_text()


async def broadcast_message(websocket: WebSocket, s: Redis.pubsub):
    msg = s.get_message(timeout=3)
    if msg is not None and type(msg["data"]) == bytes:
        result = str(msg["data"], "utf-8")
    else:
        result = '{"lat": null, "lng": null}'
    print(result)
    await websocket.send_text(result)


@app.websocket("/ws/{bus_name}")
async def websocket_endpoint(websocket: WebSocket, bus_name: str):
    await websocket.accept()
    r = Redis(host="k7b202.p.ssafy.io", port=6379, db=0)
    s = r.pubsub()
    s.subscribe(bus_name)
    try:
        while True:
            receive_message_task = asyncio.create_task(receive_message(websocket))
            broadcast_message_task = asyncio.create_task(
                broadcast_message(websocket, s)
            )
            done, pending = await asyncio.wait(
                {receive_message_task, broadcast_message_task},
                return_when=asyncio.FIRST_COMPLETED,
            )
            for task in pending:
                task.cancel()
            for task in done:
                task.result()
    except WebSocketDisconnect:
        await websocket.close()
        return
