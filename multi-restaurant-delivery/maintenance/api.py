from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from bullmq import Queue

class ScheduleRequest(BaseModel):
    vehicle_id: str
    datetime: datetime

app = FastAPI()
queue = Queue('maintenance-schedule')

@app.post("/schedule")
async def schedule(req: ScheduleRequest):
    await queue.add('notify_driver', req.dict())
    return {"status":"scheduled"}
