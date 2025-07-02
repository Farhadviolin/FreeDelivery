from fastapi import FastAPI, HTTPException
from feast import FeatureStore
import mlflow, redis

app = FastAPI()
fs = FeatureStore(repo_path="infra/feature_repo")
model = mlflow.pyfunc.load_model("models:/fraud_model/Production")
cache = redis.Redis.from_url("redis://redis:6379")

@app.post("/score/{order_id}")
async def score(order_id: str):
    # Online-Featues
    feats = fs.get_online_features(
      feature_refs=[
        "fraud_features:order_count_last_hour",
        "fraud_features:avg_amount_last_hour"
      ],
      entity_rows=[{"order_id": order_id}]
    ).to_df().drop(columns=['order_id'])
    score = model.predict_proba(feats)[0][1]
    cache.set(f"fraud_score:{order_id}", score, ex=3600)
    return {"order_id": order_id, "fraud_score": float(score)}
