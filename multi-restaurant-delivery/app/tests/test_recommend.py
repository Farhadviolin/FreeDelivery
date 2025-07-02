import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_recommend(monkeypatch):
    class DummyResp:
        class choices:
            message = type('msg', (), {'content': 'SEO suggestion'})
        choices = [message]
    monkeypatch.setattr(app, 'client', lambda: DummyResp())
    resp = client.post("/recommend", json={"pageId": "p1", "currentTitle": "Pizza", "currentDescription": "Lecker"})
    assert resp.status_code == 200
    assert "suggestion" in resp.json()
