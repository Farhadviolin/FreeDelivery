from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import xgboost as xgb
import feast
import redis

class Transaction(BaseModel):
    tx_id: str
    user_id: str
    amount: float
    timestamp: str

app = FastAPI()
fs = feast.Client()
model = xgb.Booster()
model.load_model("fraud_model.xgb")
cache = redis.Redis.from_url("redis://localhost:6379/0")

@app.post("/score")
async def score(tx: Transaction):
    if cached := cache.get(tx.tx_id):
        return {"tx_id": tx.tx_id, "score": float(cached)}
    features = fs.get_online_features(
        feature_refs=["user:tx_count_1h","user:avg_amount_24h"],
        entity_rows=[{"user_id": tx.user_id}]
    ).to_dict()
    dmat = xgb.DMatrix(data=[list(features.values())])
    score = model.predict(dmat)[0]
    cache.setex(tx.tx_id, 300, score)
    return {"tx_id": tx.tx_id, "score": float(score)}
