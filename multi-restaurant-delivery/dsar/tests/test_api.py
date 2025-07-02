import pytest
from fastapi.testclient import TestClient
from dsar.api import app

client = TestClient(app)

def test_create_and_get_status(monkeypatch):
    # Mock Redis
    class DummyRedis:
        def __init__(self): self.store = {}
        def set(self, k, v): self.store[k] = v
        def get(self, k): return self.store.get(k)
    monkeypatch.setattr('dsar.api.r', DummyRedis())

    # Mock DB
    monkeypatch.setattr('dsar.api.engine', None)

    # Test create
    resp = client.post('/dsar', json={"subject_id": "user1", "request_type": "access"})
    assert resp.status_code == 200
    assert resp.json()["status"] == "pending"

    # Test get
    resp = client.get('/dsar/user1')
    assert resp.status_code == 200
    assert resp.json()["status"] == "pending"
