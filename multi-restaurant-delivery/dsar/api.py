from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Table, MetaData
import redis

app = FastAPI()
engine = create_engine("postgresql://user:pass@db:5432/dsar")
r = redis.Redis()

class DSARRequest(BaseModel):
    subject_id: str
    request_type: str  # access, deletion

@app.post("/dsar")
def create_request(req: DSARRequest):
    with engine.begin() as conn:
        conn.execute(
          "INSERT INTO dsar_requests(subject_id, request_type, status) VALUES (%s,%s,'pending')",
          (req.subject_id, req.request_type)
        )
    # Trigger Airflow DAG
    # ...
    r.set(f"dsar:{req.subject_id}", "pending")
    return {"status":"pending"}

@app.get("/dsar/{subject_id}")
def get_status(subject_id: str):
    status = r.get(f"dsar:{subject_id}")
    if not status:
        raise HTTPException(404, "No request found")
    return {"status": status.decode()}
