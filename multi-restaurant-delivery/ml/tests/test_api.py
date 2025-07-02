from fastapi.testclient import TestClient
from ml.api import app

def test_predict(monkeypatch):
    class DummyModel:
        def predict(self, X):
            return [-1, 1]
    class DummyClient:
        def query_api(self):
            class DummyQuery:
                def query_data_frame(self, query):
                    import pandas as pd
                    return pd.DataFrame({
                        'engine_temp': [90, 95],
                        'vibration': [0.1, 0.2],
                        'oil_pressure': [3.5, 3.6]
                    })
            return DummyQuery()
    monkeypatch.setattr('ml.api.model', DummyModel())
    monkeypatch.setattr('ml.api.client', DummyClient())
    client = TestClient(app)
    resp = client.get('/predict/vehicle123')
    assert resp.status_code == 200
    assert 'anomalies_last_hour' in resp.json()
