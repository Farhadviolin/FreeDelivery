import pytest
from fastapi.testclient import TestClient
from ml_d.s.inference.app.main import app

client = TestClient(app)

def test_get_segment():
    response = client.get("/segment/testuser")
    assert response.status_code == 200
    assert "user_id" in response.json()
    assert "segment" in response.json()
