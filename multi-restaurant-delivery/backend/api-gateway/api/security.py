from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
import time

# Simple in-memory rate limiter (per IP)
RATE_LIMIT = 30  # requests
RATE_PERIOD = 60  # seconds
rate_limit_cache = {}

def get_client_ip(request: Request):
    return request.client.host

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        ip = get_client_ip(request)
        now = int(time.time())
        window = now // RATE_PERIOD
        key = f"{ip}:{window}"
        count = rate_limit_cache.get(key, 0)
        if count >= RATE_LIMIT:
            return Response("Too Many Requests", status_code=429)
        rate_limit_cache[key] = count + 1
        response = await call_next(request)
        return response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'
        response.headers['Referrer-Policy'] = 'no-referrer'
        return response
