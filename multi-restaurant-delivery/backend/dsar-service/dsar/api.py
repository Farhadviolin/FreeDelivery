from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
import uuid, secrets, redis, sqlalchemy

app = FastAPI()
db = sqlalchemy.create_engine("postgresql://...")
r = redis.Redis.from_url("redis://localhost:6379/0")

class DSARRequest(BaseModel):
    email: EmailStr

@app.post("/dsar/request")
def create_request(req: DSARRequest, bg: BackgroundTasks):
    token = secrets.token_urlsafe(32)
    with db.begin() as conn:
        conn.execute("INSERT INTO dsar_requests(email, status, token) VALUES(%s,'pending',%s)",
                     (req.email, token))
    r.setex(f"dsar:{token}", 86400, req.email)
    # Trigger Airflow DAG
    bg.add_task(trigger_airflow, token)
    return {"token": token}

def trigger_airflow(token: str):
    import requests
    requests.post("http://airflow:8080/api/v1/dags/dsar_pipeline/dagRuns",
                  json={"conf": {"token": token}})

@app.get("/dsar/status/{token}")
def get_status(token: str):
    with db.begin() as conn:
        res = conn.execute("SELECT status FROM dsar_requests WHERE token=%s", (token,)).fetchone()
    if not res: raise HTTPException(404)
    return {"status": res[0]}
