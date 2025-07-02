import pytest
from fastapi.testclient import TestClient
from gateway.main import app

client = TestClient(app)

def test_create_order_rate_limit():
    # Simuliere 1001 Requests mit Dummy-Token
    token = "testtoken"
    headers = {"Authorization": f"Bearer {token}"}
    order = {"restaurantId": "r1", "items": [{"productId": "p1", "quantity": 2}]}
    for i in range(1000):
        resp = client.post("/orders", json=order, headers=headers)
        assert resp.status_code in (200, 201, 422)  # 422 falls forward_to_service nicht implementiert
    resp = client.post("/orders", json=order, headers=headers)
    assert resp.status_code == 429
