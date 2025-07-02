from fastapi.testclient import TestClient
from personal.api import app

client = TestClient(app)

def test_get_personalization_high_propensity(monkeypatch):
    class DummyRedis:
        def hget(self, key, user_id):
            if key == 'user_segments': return b'Vielbesteller'
            if key == 'user_propensity': return b'0.9'
            return None
    monkeypatch.setattr('personal.api.redis_client', DummyRedis())
    resp = client.get('/personal/user123')
    assert resp.status_code == 200
    assert resp.json()['strategy'] == 'high_propensity_recs'
    assert resp.json()['segment'] == 'Vielbesteller'

def test_get_personalization_standard(monkeypatch):
    class DummyRedis:
        def hget(self, key, user_id):
            if key == 'user_segments': return b'Standard'
            if key == 'user_propensity': return b'0.2'
            return None
    monkeypatch.setattr('personal.api.redis_client', DummyRedis())
    resp = client.get('/personal/user456')
    assert resp.status_code == 200
    assert resp.json()['strategy'] == 'standard'
    assert resp.json()['segment'] == 'Standard'
