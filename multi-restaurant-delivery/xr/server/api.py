from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from kafka import KafkaProducer
import uuid, shutil

app = FastAPI()
producer = KafkaProducer(bootstrap_servers='kafka:9092')

@app.post("/upload-model")
async def upload_model(file: UploadFile = File(...)):
    path = f"/assets/models/{uuid.uuid4()}.glb"
    with open(path, "wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"url": path}

class XREvent(BaseModel):
    userId: str
    eventType: str
    details: dict

@app.post("/xr-event")
def xr_event(evt: XREvent):
    producer.send('xr_events', evt.json().encode())
    return {"status":"ok"}
