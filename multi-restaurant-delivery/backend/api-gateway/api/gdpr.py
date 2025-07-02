from fastapi import APIRouter, HTTPException, Request, Depends
from .main import users, decode_jwt
from pydantic import BaseModel

gdpr_router = APIRouter()

consents = {}

class ConsentRequest(BaseModel):
    consent: bool

@gdpr_router.get('/export')
def export_data(token: str = Depends(lambda: None)):
    user = decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    username = user['sub']
    data = users.get(username)
    if not data:
        raise HTTPException(status_code=404, detail="User not found")
    return {"username": username, "data": data}

@gdpr_router.post('/delete')
def delete_account(token: str = Depends(lambda: None)):
    user = decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    username = user['sub']
    if username in users:
        del users[username]
    return {"msg": "Account deleted (demo)"}

@gdpr_router.get('/consent')
def get_consent(token: str = Depends(lambda: None)):
    user = decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    username = user['sub']
    return {"consent": consents.get(username, False)}

@gdpr_router.post('/consent')
def set_consent(req: ConsentRequest, token: str = Depends(lambda: None)):
    user = decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    username = user['sub']
    consents[username] = req.consent
    return {"msg": "Consent updated", "consent": req.consent}
