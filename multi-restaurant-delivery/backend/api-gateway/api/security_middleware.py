# Security-Middleware für Rate-Limit und Security-Header
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import time

RATE_LIMITS = {}
MAX_REQ_PER_MIN = 60

class SecurityMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Security-Header
        response: Response = await call_next(request)
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'
        response.headers['Referrer-Policy'] = 'no-referrer'
        # Rate-Limit
        user = request.headers.get('X-User', 'anon')
        now = int(time.time() / 60)
        key = f"{user}:{now}"
        RATE_LIMITS.setdefault(key, 0)
        RATE_LIMITS[key] += 1
        if RATE_LIMITS[key] > MAX_REQ_PER_MIN:
            return JSONResponse({"error": "Rate limit exceeded"}, status_code=429)
        return response
