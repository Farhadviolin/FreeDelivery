from fastapi import FastAPI
import joblib, pandas as pd
from influxdb_client import InfluxDBClient
from ml.forecast import predict_forecast
import requests

app = FastAPI()
model = joblib.load('/models/pm_model.joblib')
client = InfluxDBClient(url="http://influx:8086", token="token", org="org")

@app.get("/forecast/{vehicle_id}")
def forecast(vehicle_id: str, hours: int = 24):
    # Dummy: Prognose für die nächsten Stunden
    result = predict_forecast(periods=hours)
    return result.to_dict(orient="records")

@app.get("/predict/{vehicle_id}")
def predict(vehicle_id: str):
    query = f'from(bucket:"telemetry") |> range(start: -1h) |> filter(fn: (r) => r.vehicle_id == "{vehicle_id}")'
    df = client.query_api().query_data_frame(query)
    features = df[['engine_temp','vibration','oil_pressure']]
    preds = model.predict(features)
    anomalies = (preds == -1).sum()
    # Webhook bei Anomalie
    if anomalies > 0:
        requests.post("https://werkstatt.example.com/webhook", json={"vehicle_id": vehicle_id, "anomalies": int(anomalies)})
    return {"vehicle_id": vehicle_id, "anomalies_last_hour": int(anomalies)}
