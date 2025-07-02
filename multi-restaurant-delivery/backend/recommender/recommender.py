from fastapi import FastAPI
import redis
import psycopg
import numpy as np
import pickle
from model import load_model

app = FastAPI()
r = redis.Redis(host="redis", port=6379)
conn = psycopg.connect("dbname=app user=app")
model = load_model()

@app.get("/recommend/{user_id}")
def recommend(user_id: int, top_k: int = 5):
    feats = np.frombuffer(r.get(f"user:{user_id}:features"), dtype=np.float32)
    scores = model.predict(feats.reshape(1, -1))
    top_indices = np.argsort(scores)[0][-top_k:]
    items = [int(i) for i in top_indices]
    return {"recommendations": items}
