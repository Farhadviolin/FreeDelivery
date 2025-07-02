# ota_agent.py
import paho.mqtt.client as mqtt, requests, os

def on_message(_,__,msg):
    if msg.topic == "edge/ota/update":
        url = msg.payload.decode()
        r = requests.get(url)
        open("model.tflite","wb").write(r.content)
        print("Model updated from:", url)

client = mqtt.Client()
client.connect("broker")
client.subscribe("edge/ota/update")
client.on_message = on_message
client.loop_forever()
