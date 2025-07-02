from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import os

app = FastAPI(openapi_url="/openapi.json", docs_url="/docs")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="https://auth.delivery.com/token")

TEST_MODE = os.environ.get("TEST_MODE", "0") == "1"
if not TEST_MODE:
    import redis
    r = redis.Redis.from_url("redis://redis:6379")
else:
    r = None

if not TEST_MODE:
    import kafka
    producer = kafka.KafkaProducer(bootstrap_servers=['kafka:9092'])
else:
    producer = None

def rate_limit(token: str = Depends(oauth2_scheme)):
    if r is None:
        return
    key = f"quota:{token}"
    count = r.incr(key)
    if count > 1000:
        raise HTTPException(429, "Rate limit exceeded")
    r.expire(key, 3600)

@app.post("/orders", dependencies=[Depends(rate_limit)])
async def create_order(order: dict, token: str = Depends(oauth2_scheme)):
    # forward to core service
    resp = {"orderId": "test123", "status": "created"}
    if producer:
        producer.send("partner.events", b"order.created")
    return resp
