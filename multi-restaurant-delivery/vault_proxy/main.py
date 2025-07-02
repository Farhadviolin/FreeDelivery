from fastapi import FastAPI, HTTPException
import hvac, os

app = FastAPI()
client = hvac.Client(url=os.getenv("VAULT_ADDR"), token=os.getenv("VAULT_TOKEN"))

@app.post("/encrypt")
async def encrypt(data: dict):
    resp = client.secrets.transit.encrypt_data(
        name="personal_data", plaintext=data['plaintext']
    )
    return {"ciphertext": resp['data']['ciphertext']}

@app.post("/decrypt")
async def decrypt(data: dict):
    resp = client.secrets.transit.decrypt_data(
        name="personal_data", ciphertext=data['ciphertext']
    )
    return {"plaintext": resp['data']['plaintext']}
