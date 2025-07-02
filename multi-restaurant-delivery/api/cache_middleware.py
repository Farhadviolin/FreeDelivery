import redis, hashlib, json
from fastapi import Request, Response

cache = redis.Redis(host='redis', port=6379)

async def cache_sql(request: Request, call_next):
    key = hashlib.sha256(request.url.path.encode() + 
                         str(request.query_params).encode()).hexdigest()
    if cache.exists(key):
        return Response(cache.get(key), media_type="application/json")
    response = await call_next(request)
    if response.status_code == 200:
        cache.setex(key, 300, response.body)
    return response
