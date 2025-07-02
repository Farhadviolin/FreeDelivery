from fastapi import BackgroundTasks
from app.main import app
from pymongo import MongoClient
import requests, os

mongo = MongoClient(os.getenv("MONGO_URL"))
coll = mongo.get_database("content").suggestions

@app.post("/feedback")
def feedback(pageId: str, variant: str, ctr: float, dwell: float, bg: BackgroundTasks):
    # Speichere Feedback in MongoDB
    coll.update_one({"pageId": pageId, "variant": variant}, {"$set": {"ctr": ctr, "dwell": dwell}}, upsert=True)
    # Trigger Retraining-Task (z.B. Airflow DAG)
    bg.add_task(trigger_retrain, pageId)
    return {"status": "ok"}

def trigger_retrain(pageId: str):
    requests.post("http://airflow:8080/api/v1/dags/seo_retrain/dagRuns", json={"conf": {"pageId": pageId}})
