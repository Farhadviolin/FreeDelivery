from kafka import KafkaConsumer
import requests

def get_partner_webhooks(event):
    # Dummy implementation, replace with DB lookup
    return ["https://webhook.partner.com/event"]

consumer = KafkaConsumer('partner.events', bootstrap_servers=['kafka:9092'])
for msg in consumer:
    event = msg.value.decode()
    for url in get_partner_webhooks(event):
        requests.post(url, json={"event": event})
