from fastapi.testclient import TestClient
from xr.server.api import app

def test_upload_model(monkeypatch):
    client = TestClient(app)
    def dummy_save(file, out): pass
    monkeypatch.setattr('shutil.copyfileobj', dummy_save)
    response = client.post('/upload-model', files={'file': ('test.glb', b'data')})
    assert response.status_code == 200
    assert 'url' in response.json()

def test_xr_event():
    client = TestClient(app)
    response = client.post('/xr-event', json={"userId":"u1","eventType":"view","details":{}})
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
