from fastapi import FastAPI
from pydantic import BaseModel
import mlflow
import pandas as pd

class MetricFeature(BaseModel):
    name: str
    instance: str
    mean_val: float
    std_val: float
    window_end: str

app = FastAPI()
model = mlflow.pyfunc.load_model("models:/anomaly_detector/Production")

@app.post("/detect")
async def detect(features: MetricFeature):
    df = pd.DataFrame([features.dict()])
    score = model.predict(df)[0]  # 1 = anomaly
    if score == 1:
        # forward to Alertmanager webhook
        # ...
        return {"anomaly": True}
    return {"anomaly": False}
