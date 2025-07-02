import pandas as pd
from influxdb_client import InfluxDBClient
from sklearn.ensemble import IsolationForest
import joblib

def extract_features():
    client = InfluxDBClient(url="http://influx:8086", token="token", org="org")
    query = 'from(bucket:"telemetry") |> range(start: -7d)'
    df = client.query_api().query_data_frame(query)
    df.to_csv('/tmp/telemetry.csv', index=False)

def train_model():
    df = pd.read_csv('/tmp/telemetry.csv')
    features = df[['engine_temp','vibration','oil_pressure']]
    model = IsolationForest(contamination=0.01).fit(features)
    joblib.dump(model, '/models/pm_model.joblib')
