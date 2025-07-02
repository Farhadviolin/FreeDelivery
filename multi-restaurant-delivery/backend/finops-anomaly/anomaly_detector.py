from kafka import KafkaConsumer
from sklearn.ensemble import IsolationForest
import boto3
import redis

consumer = KafkaConsumer("cloud-costs", bootstrap_servers="kafka:9092")
r = redis.Redis(host="redis", port=6379)
model = IsolationForest(contamination=0.01)

def parse(val):
    return float(val)

def update_baseline(new_val):
    # Dummy: gleitender Mittelwert
    return new_val

def send_alert(msg):
    print(f"ALERT: {msg}")

while True:
    msg = next(consumer).value
    data = parse(msg)
    baseline = float(r.get("cost_baseline") or 0)
    score = model.fit_predict([[data]])[0]
    if score == -1 and data > baseline * 1.2:
        send_alert(f"Cost spike: {data}")
    r.set("cost_baseline", update_baseline(data))
