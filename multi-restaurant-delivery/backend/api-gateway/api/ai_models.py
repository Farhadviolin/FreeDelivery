# Backend: KI-Modelle (Recommendation, Anomaly Detection)
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import NearestNeighbors

router = APIRouter()

class Order(BaseModel):
    id: int
    user_id: int
    items: List[str]
    total: float
    timestamp: str

# Dummy data for demo
ORDERS = [
    Order(id=1, user_id=1, items=["Pizza"], total=20, timestamp="2023-01-01T12:00:00"),
    Order(id=2, user_id=2, items=["Burger"], total=15, timestamp="2023-01-01T13:00:00"),
]

@router.post("/recommendation")
def recommend(order: Order):
    # Dummy: recommend most common item
    return {"recommendation": "Pizza"}

@router.post("/anomaly-detection")
def anomaly(order: Order):
    # Dummy: flag high total as anomaly
    if order.total > 100:
        return {"anomaly": True}
    return {"anomaly": False}
