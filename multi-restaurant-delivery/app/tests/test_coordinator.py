import pytest
from fastapi.testclient import TestClient
from app.coordinator import app

client = TestClient(app)

def test_federate():
    resp = client.post("/federate", json={"weights": [1,2,3]})
    assert resp.status_code == 200
    assert "metrics" in resp.json()
