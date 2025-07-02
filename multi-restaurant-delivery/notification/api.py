from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from bullmq import Queue
import os

class NotifyRequest(BaseModel):
    channel: str    # email, sms, push, slack
    to: str
    template: str
    data: dict

app = FastAPI()
queue = Queue('notifications', connection={'host':'redis','port':6379})

@app.post("/notify")
async def notify(req: NotifyRequest):
    job = await queue.add('send', req.dict(), {'attempts': 3, 'backoff': {'type':'exponential','delay':5000}})
    return {"jobId": job.id}
