from fastapi import FastAPI
import boto3
app = FastAPI()
iot = boto3.client('iot')

@app.get("/devices")
def list_devices():
    things = iot.list_things()['things']
    return [{"thingName": t['thingName'], "attributes": t.get('attributes', {})} for t in things]
