from fastapi import APIRouter, Response
import time

metrics_router = APIRouter()

# Simple Prometheus metrics (demo)
START_TIME = time.time()
REQUEST_COUNT = 0

@metrics_router.get('/metrics')
def metrics():
    global REQUEST_COUNT
    uptime = int(time.time() - START_TIME)
    REQUEST_COUNT += 1
    metrics = f"""
# HELP app_uptime_seconds Uptime in seconds
# TYPE app_uptime_seconds counter
app_uptime_seconds {uptime}
# HELP app_request_count Total HTTP requests
# TYPE app_request_count counter
app_request_count {REQUEST_COUNT}
"""
    return Response(content=metrics, media_type="text/plain")
