import json, time
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

client = AWSIoTMQTTClient("test-sim-device")
client.configureEndpoint("a1b2c3d4e5-ats.iot.us-east-1.amazonaws.com", 8883)
client.configureCredentials("root-CA.crt", "private.key", "certificate.pem.crt")
client.connect()
for i in range(5):
    payload = {"temperature": 5.0 + i, "door_open": i % 2 == 0}
    client.publish("kitchen/telemetry", json.dumps(payload), 1)
    print("Published:", payload)
    time.sleep(2)
