from fastapi import FastAPI, Request
import requests

app = FastAPI()
ORDER_API = "https://api.delivery.com/orders"

@app.post("/webhook")
async def webhook(req: Request):
    data = await req.json()
    intent = data["intent"]["name"]
    if intent == "place_order":
        dish = data["entities"].get("dish")
        resp = requests.post(ORDER_API, json={"dish": dish, "user_id": data["sender_id"]})
        return {"text": f"Ihre Bestellung für {dish} wurde aufgegeben! Bestellnr: {resp.json()['order_id']}"}
    return {"text": "Entschuldigung, das habe ich nicht verstanden."}
