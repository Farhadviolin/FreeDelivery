from fastapi import FastAPI, Request
import redis, uvicorn
import json

app = FastAPI()
redis_client = redis.Redis()

@app.get("/personal/{user_id}")
def get_personalization(user_id: str, request: Request):
    segment = redis_client.hget("user_segments", user_id) or b"default"
    propensity = float(redis_client.hget("user_propensity", user_id) or 0.0)
    if propensity > 0.8:
        strategy = "high_propensity_recs"
    else:
        strategy = "standard"
    return {"strategy": strategy, "segment": segment.decode()}
