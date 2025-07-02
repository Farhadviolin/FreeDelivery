import boto3
iot = boto3.client('iot')
resp = iot.create_keys_and_certificate(setAsActive=True)
thing = iot.create_thing(thingName="smart-oven-001")
iot.attach_thing_principal(thingName=thing['thingName'], principal=resp['certificateArn'])
print("Certificate PEM:", resp['certificatePem'])
print("Private Key:", resp['keyPair']['PrivateKey'])
