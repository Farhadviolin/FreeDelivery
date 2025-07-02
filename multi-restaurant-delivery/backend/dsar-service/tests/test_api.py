import pytest
from fastapi.testclient import TestClient
from dsar.api import app

client = TestClient(app)

def test_create_request():
    response = client.post("/dsar/request", json={"email": "test@example.com"})
    assert response.status_code == 200
    assert "token" in response.json()

def test_get_status_not_found():
    response = client.get("/dsar/status/invalidtoken")
    assert response.status_code == 404
