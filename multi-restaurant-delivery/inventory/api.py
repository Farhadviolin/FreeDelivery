from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, select, update
from sqlalchemy.orm import Session
from models import StockItem, StockMovement
import redis, uuid

app = FastAPI()
engine = create_engine("postgresql://user:pass@db:5432/inventory")
cache = redis.Redis(host='redis', port=6379)

class ReservationRequest(BaseModel):
    product_id: str
    warehouse_id: str
    qty: int

@app.post("/reserve")
def reserve(req: ReservationRequest):
    lock_key = f"lock:{req.product_id}:{req.warehouse_id}"
    if not cache.set(lock_key, "1", nx=True, ex=5):
        raise HTTPException(409, "Item locked, try again")
    with Session(engine) as s:
        item = s.query(StockItem).filter_by(
          product_id=req.product_id, warehouse_id=req.warehouse_id
        ).with_for_update().first()
        if not item or item.quantity - item.reserved < req.qty:
            cache.delete(lock_key)
            raise HTTPException(400, "Insufficient stock")
        item.reserved += req.qty
        s.add(StockMovement(item_id=item.id, delta=-req.qty, reason="reservation"))
        s.commit()
    cache.delete(lock_key)
    return {"status":"reserved"}

@app.post("/adjust")
def adjust(product_id: str, warehouse_id: str, delta: int):
    with Session(engine) as s:
        item = s.query(StockItem).filter_by(product_id=product_id, warehouse_id=warehouse_id).first()
        if not item:
            item = StockItem(product_id=product_id, warehouse_id=warehouse_id, quantity=0)
        item.quantity += delta
        s.add(StockMovement(item_id=item.id, delta=delta, reason="adjustment"))
        s.commit()
    return {"status":"ok"}
