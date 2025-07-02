from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from .locales import translate
import random

twofa_router = APIRouter()

# In-memory store for demo
TWOFA_CODES = {}

class TwoFARequest(BaseModel):
    username: str

class TwoFACheck(BaseModel):
    username: str
    code: str

@twofa_router.post('/request')
def request_2fa(req: TwoFARequest, request: Request):
    lang = request.headers.get('accept-language', 'en').split(',')[0][:2]
    code = str(random.randint(100000, 999999))
    TWOFA_CODES[req.username] = code
    # In real world: send via SMS/Email
    return {"msg": translate('2fa_sent', lang), "code": code}  # code only for demo

@twofa_router.post('/verify')
def verify_2fa(req: TwoFACheck, request: Request):
    lang = request.headers.get('accept-language', 'en').split(',')[0][:2]
    if TWOFA_CODES.get(req.username) == req.code:
        return {"msg": translate('2fa_success', lang)}
    raise HTTPException(status_code=400, detail=translate('2fa_invalid', lang))
