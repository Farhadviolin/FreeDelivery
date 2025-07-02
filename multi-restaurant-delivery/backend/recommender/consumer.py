from kafka import KafkaConsumer
import redis
import psycopg
import json
import numpy as np

r = redis.Redis(host="redis", port=6379)
conn = psycopg.connect("dbname=app user=app")
consumer = KafkaConsumer(
    'events',
    bootstrap_servers=['kafka:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for msg in consumer:
    event = msg.value
    user_id = event['user_id']
    features = np.array(event['features'], dtype=np.float32)
    r.set(f"user:{user_id}:features", features.tobytes())
    # Optional: Features auch in PostgreSQL persistieren
    # with conn.cursor() as cur:
    #     cur.execute("INSERT INTO user_features (user_id, features) VALUES (%s, %s)", (user_id, features.tobytes()))
    #     conn.commit()
