from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
import redis, json, asyncio

app = FastAPI()
r = redis.Redis()

class FeedPost(BaseModel):
    id: str
    type: str
    content: dict

@app.post("/feed")
async def create_post(post: FeedPost):
    r.lpush("feed:posts", post.json())
    # Notify subscribers
    await broadcast(post.json())
    return {"status":"posted"}

clients = set()

@app.websocket("/ws/feed")
async def feed_ws(ws: WebSocket):
    await ws.accept()
    clients.add(ws)
    try:
        while True:
            await ws.receive_text()
    except:
        clients.remove(ws)

async def broadcast(message):
    for ws in clients:
        await ws.send_text(message)
