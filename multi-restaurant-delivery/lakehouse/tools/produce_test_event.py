from kafka import KafkaProducer
import json
from datetime import datetime

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

event = {
    "event_id": "e1",
    "user_id": "u1",
    "event_type": "order",
    "ts": datetime.utcnow().isoformat()
}

producer.send('delivery_events', event)
producer.flush()
print("Test-Event gesendet:", event)
