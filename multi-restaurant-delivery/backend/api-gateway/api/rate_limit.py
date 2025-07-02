# API-Rate-Limits pro Tenant/User
from fastapi import APIRouter, Request, HTTPException
from starlette.responses import JSONResponse
from collections import defaultdict
import time

router = APIRouter()
RATE_LIMITS = defaultdict(lambda: {"count": 0, "reset": time.time() + 60})
MAX_REQ_PER_MIN = 60

@router.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    tenant = request.headers.get("X-Tenant")
    user = request.headers.get("X-User")
    key = f"{tenant}:{user}"
    now = time.time()
    entry = RATE_LIMITS[key]
    if now > entry["reset"]:
        entry["count"] = 0
        entry["reset"] = now + 60
    entry["count"] += 1
    if entry["count"] > MAX_REQ_PER_MIN:
        return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
    return await call_next(request)
