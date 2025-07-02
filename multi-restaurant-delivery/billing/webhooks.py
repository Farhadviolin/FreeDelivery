from fastapi import FastAPI, Request
import stripe, os

app = FastAPI()
stripe.api_key = os.getenv("STRIPE_SECRET")

@app.post("/webhooks/stripe")
async def stripe_webhook(req: Request):
    payload = await req.body()
    sig = req.headers.get("stripe-signature")
    event = stripe.Webhook.construct_event(payload, sig, os.getenv("STRIPE_WH_SECRET"))
    # Handle subscription events
    if event['type'] == 'invoice.payment_succeeded':
        # update user plan status in DB
        pass
    return {"status": "success"}
