import pandas as pd
from prophet import Prophet
import joblib

def train_forecast():
    df = pd.read_csv('/tmp/telemetry.csv')
    # Beispiel: Prognose auf Motor-Temperatur
    df_prophet = df.rename(columns={'engine_temp': 'y', 'timestamp': 'ds'})[['ds', 'y']]
    model = Prophet()
    model.fit(df_prophet)
    joblib.dump(model, '/models/pm_forecast.joblib')

def predict_forecast(periods=24):
    model = joblib.load('/models/pm_forecast.joblib')
    future = model.make_future_dataframe(periods=periods, freq='H')
    forecast = model.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
