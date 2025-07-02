from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List
import jwt
import time
import hashlib
import os
from .locales import translate
from .payment import router as payment_router
from .security import RateLimitMiddleware, SecurityHeadersMiddleware
from .twofa import twofa_router
from .metrics import metrics_router
from .logging_setup import logger
from .sentry_setup import *
from .ws import ws_router
from .gdpr import gdpr_router
from .policy import has_role, can_access
from .notification_api import notification_router
from .analytics import analytics_router
from .ai_models import router as ai_router
from .policy_engine import router as policy_router
from .rate_limit import router as rate_limit_router
from .audit import router as audit_router
from .driver_settings import router as driver_settings_router
from .security_middleware import SecurityMiddleware

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

def create_app():
    app = FastAPI()
    app.add_middleware(SecurityMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_middleware(RateLimitMiddleware)
    app.add_middleware(SecurityHeadersMiddleware)
    
    return app

app = create_app()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

users = {
    "kunde@demo.at": {"password": hash_password("test123"), "role": "customer"}
}
restaurants = [
    {"id": 1, "name": "Pizza Palace"},
    {"id": 2, "name": "Sushi World"},
]
orders = []
menus = {
    1: [  # Restaurant ID 1
        {"id": 1, "name": "Pizza Margherita", "price": 9.5},
        {"id": 2, "name": "Pizza Salami", "price": 10.5},
    ],
    2: [  # Restaurant ID 2
        {"id": 1, "name": "Sushi Box", "price": 14.0},
    ],
}

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    username: str
    password: str
    role: str

class RegisterRequest(BaseModel):
    username: str
    password: str
    role: str

class Order(BaseModel):
    id: int
    restaurant_id: int
    customer: str
    items: List[str]
    status: str = "pending"

class Restaurant(BaseModel):
    id: int
    name: str

class MenuItem(BaseModel):
    id: int
    name: str
    price: float

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def create_jwt(username: str, role: str):
    payload = {"sub": username, "role": role, "exp": time.time() + 3600}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None

def get_lang(request: Request) -> str:
    return request.headers.get('accept-language', 'en').split(',')[0][:2]

@app.get("/api/greet")
def greet(request: Request):
    lang = get_lang(request)
    return {"message": translate('greeting', lang)}

@app.post("/api/auth/register")
def register(req: RegisterRequest, request: Request):
    lang = get_lang(request)
    if req.username in users:
        raise HTTPException(status_code=400, detail=translate("user_registered", lang))
    users[req.username] = {"password": hash_password(req.password), "role": req.role}
    return {"msg": translate("user_registered", lang)}

@app.post("/api/auth/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), request: Request = None):
    lang = get_lang(request) if request else 'en'
    user = users.get(form_data.username)
    if not user or user["password"] != hash_password(form_data.password):
        raise HTTPException(status_code=400, detail=translate("invalid_credentials", lang))
    token = create_jwt(form_data.username, user["role"])
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/restaurants", response_model=List[Restaurant])
def get_restaurants():
    return restaurants

@app.post("/api/orders", response_model=Order)
def create_order(order: Order, token: str = Depends(oauth2_scheme)):
    user = decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    orders.append(order.dict())
    return order

@app.get("/api/orders", response_model=List[Order])
def list_orders(token: str = Depends(oauth2_scheme)):
    user = decode_jwt(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    # Demo: Filter nach tenant (wenn gesetzt)
    user_tenant = user.get("tenant")
    if user_tenant:
        return [o for o in orders if o.get("tenant") == user_tenant or has_role(user, "admin")]
    return orders

@app.get("/api/menus/{restaurant_id}", response_model=List[MenuItem])
def get_menu(restaurant_id: int):
    return menus.get(restaurant_id, [])

@app.post("/api/menus/{restaurant_id}", response_model=MenuItem)
def add_menu_item(restaurant_id: int, item: MenuItem, token: str = Depends(oauth2_scheme), request: Request = None):
    lang = get_lang(request) if request else 'en'
    user = decode_jwt(token)
    if not user or user.get("role") != "restaurant":
        raise HTTPException(status_code=403, detail=translate("only_restaurant_admins", lang))
    if restaurant_id not in menus:
        menus[restaurant_id] = []
    menus[restaurant_id].append(item.dict())
    return item

def include_enterprise_routers(app):
    app.include_router(ai_router, prefix="/api/ai")
    app.include_router(policy_router, prefix="/api")
    app.include_router(rate_limit_router, prefix="/api")
    app.include_router(audit_router, prefix="/api")
    app.include_router(driver_settings_router, prefix="/api")

include_enterprise_routers(app)

app.include_router(payment_router, prefix="/api/payment")
app.include_router(twofa_router, prefix="/api/2fa")
app.include_router(metrics_router)
app.include_router(ws_router)
app.include_router(gdpr_router, prefix="/api/gdpr")
app.include_router(notification_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")

logger.info('KiLiefer API Gateway started.')
