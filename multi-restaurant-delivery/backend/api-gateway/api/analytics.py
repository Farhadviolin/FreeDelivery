from fastapi import APIRouter, Request
from typing import List
import random

analytics_router = APIRouter()

# Demo: Event-Log (in-memory)
events: List[dict] = []

@analytics_router.post('/analytics/event')
def log_event(request: Request):
    data = request.json() if hasattr(request, 'json') else {}
    events.append(data)
    return {"msg": "Event logged"}

@analytics_router.get('/analytics/report')
def get_report():
    # Demo: simple event count
    return {"event_count": len(events)}

@analytics_router.get('/analytics/recommendation')
def get_recommendation():
    # Demo: Recommend random menu item
    menu = ["Pizza Margherita", "Pizza Salami", "Sushi Box", "Burger"]
    return {"recommendation": random.choice(menu)}

@analytics_router.get('/analytics/anomaly')
def get_anomaly():
    # Demo: Random anomaly detection
    anomaly = random.choice([True, False])
    return {"anomaly_detected": anomaly}
