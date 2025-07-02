from fastapi import FastAPI
from worker.tasks import process_order

app = FastAPI()

@app.post("/enqueue-order")
def enqueue_order(order_id: int):
    result = process_order.delay(order_id)
    return {"task_id": result.id, "status": "queued"}
