import pandas as pd
from ml.training import extract_features, train_model

def test_feature_extraction(tmp_path, monkeypatch):
    # Dummy InfluxDB mock
    class DummyClient:
        def query_api(self):
            class DummyQuery:
                def query_data_frame(self, query):
                    return pd.DataFrame({
                        'engine_temp': [90, 95],
                        'vibration': [0.1, 0.2],
                        'oil_pressure': [3.5, 3.6]
                    })
            return DummyQuery()
    monkeypatch.setattr('ml.training.InfluxDBClient', lambda *a, **kw: DummyClient())
    extract_features()
    df = pd.read_csv('/tmp/telemetry.csv')
    assert not df.empty

def test_train_model(tmp_path, monkeypatch):
    # Prepare dummy CSV
    df = pd.DataFrame({
        'engine_temp': [90, 95],
        'vibration': [0.1, 0.2],
        'oil_pressure': [3.5, 3.6]
    })
    df.to_csv('/tmp/telemetry.csv', index=False)
    train_model()
    import os
    assert os.path.exists('/models/pm_model.joblib')
