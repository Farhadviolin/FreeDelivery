from fastapi import FastAPI, Depends, Request, HTTPException
from pydantic import BaseModel
import stripe, os

stripe.api_key = os.getenv("STRIPE_SECRET")

class CreateSub(BaseModel):
    customer_id: str
    price_id: str

app = FastAPI()

@app.post("/subscriptions")
def create_subscription(req: CreateSub):
    sub = stripe.Subscription.create(
        customer=req.customer_id,
        items=[{"price": req.price_id}],
        expand=["latest_invoice.payment_intent"]
    )
    return sub
