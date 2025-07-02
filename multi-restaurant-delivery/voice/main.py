from fastapi import FastAPI, Request
import requests, os

app = FastAPI()
RASA_URL = os.getenv("RASA_URL", "http://localhost:5005")

@app.post("/voice/webhook")
async def voice_webhook(req: Request):
    payload = await req.json()
    user_input = payload["request"]["intent"]["slots"]["utterance"]["value"]
    rasa_resp = requests.post(f"{RASA_URL}/webhooks/rest/webhook", json={"message": user_input})
    text = rasa_resp.json()[0]["text"]
    return {"version":"1.0","response":{"outputSpeech":{"type":"PlainText","text":text}}}
