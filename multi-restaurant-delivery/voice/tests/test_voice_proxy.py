from fastapi.testclient import TestClient
from voice.main import app
import json

def test_voice_webhook(monkeypatch):
    client = TestClient(app)
    def mock_post(url, json):
        class Resp:
            def json(self):
                return [{"text": "Hallo!"}]
        return Resp()
    monkeypatch.setattr("requests.post", mock_post)
    payload = {"request": {"intent": {"slots": {"utterance": {"value": "Hallo"}}}}}
    resp = client.post("/voice/webhook", json=payload)
    assert resp.status_code == 200
    assert resp.json()["response"]["outputSpeech"]["text"] == "Hallo!"
