from fastapi import FastAPI, HTTPException
import hvac, os

app = FastAPI()
vault = hvac.Client(url=os.getenv("VAULT_ADDR"), token=os.getenv("VAULT_TOKEN"))

@app.post("/keys/generate")
async def generate_key(name: str):
    resp = vault.secrets.transit.create_key(name=name)
    return {"status": "created", "key_name": name}

@app.post("/keys/encrypt")
async def encrypt_data(name: str, plaintext: str):
    resp = vault.secrets.transit.encrypt_data(name=name, plaintext=plaintext)
    return {"ciphertext": resp['data']['ciphertext']}

@app.post("/keys/decrypt")
async def decrypt_data(name: str, ciphertext: str):
    resp = vault.secrets.transit.decrypt_data(name=name, ciphertext=ciphertext)
    return {"plaintext": resp['data']['plaintext']}
