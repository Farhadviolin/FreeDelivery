import time, redis
from fastapi import Request, HTTPException

r = redis.Redis()

def get_plan(api_key):
    # Dummy: Replace with DB lookup
    class Plan: quota_per_month = 100
    return Plan()

async def rate_limit(request: Request, call_next):
    api_key = request.headers.get("X-API-Key")
    plan = get_plan(api_key)  # from DB
    limit = plan.quota_per_month
    key = f"usage:{api_key}:{time.strftime('%Y-%m')}"
    count = r.incr(key)
    if count > limit:
        raise HTTPException(status_code=429, detail="Quota exceeded")
    response = await call_next(request)
    return response
