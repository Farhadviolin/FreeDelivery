# forecast_consumer.py
from kafka import KafkaConsumer
import psycopg
import pickle
consumer = KafkaConsumer("orders", bootstrap_servers="kafka:9092")
conn = psycopg.connect("dbname=app user=app")
with open("models/sales_model.pkl","rb") as f:
    model = pickle.load(f)
for msg in consumer:
    data = msg.value  # {restaurant_id, timestamp, items}
    df = preprocess(data)
    pred = model.predict(df)
    upsert_forecast(conn, pred)
