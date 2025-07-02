import ssl, json, time
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

client = AWSIoTMQTTClient("smart-kitchen-device")
client.configureEndpoint("a1b2c3d4e5-ats.iot.us-east-1.amazonaws.com", 8883)
client.configureCredentials("root-CA.crt", "private.key", "certificate.pem.crt")
client.configureOfflinePublishQueueing(-1)
client.configureConnectDisconnectTimeout(10)
client.configureMQTTOperationTimeout(5)

def report_state():
  payload = {"temperature": 5.2, "door_open": False}
  client.publish("kitchen/telemetry", json.dumps(payload), 1)

client.connect()
client.publish("kitchen/telemetry", json.dumps({"status":"online"}), 1)
client.subscribe("kitchen/commands", 1, lambda *args: print("Command:", args))
while True:
  report_state()
  time.sleep(60)
