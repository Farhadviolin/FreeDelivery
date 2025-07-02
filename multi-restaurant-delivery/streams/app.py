from confluent_kafka import Consumer, Producer
import feast
import json

consumer = Consumer({...})
producer = Producer({...})
fs = feast.FeatureStore(repo_path="infra/feature_repo")

consumer.subscribe(['user-events'])
while True:
    msg = consumer.poll(1.0)
    if msg and not msg.error():
        event = json.loads(msg.value())
        features = fs.get_online_features(
            feature_refs=["user:last_order_value","user:avg_order_interval"],
            entity_rows=[{"user_id": event["user_id"]}]
        ).to_dict()
        # Update Redis cache
        producer.produce('feature-cache', json.dumps({"user_id":event["user_id"], **features}))
