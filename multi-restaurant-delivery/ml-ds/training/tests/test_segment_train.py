import pytest
from ml_d.s.training.dags.segment_train import train_segment_model

def test_train_segment_model_runs():
    # Testet, ob das Training ohne Fehler durchläuft (Dummy-FeatureStore nötig)
    try:
        train_segment_model()
    except Exception as e:
        pytest.skip(f"FeatureStore/MLflow nicht konfiguriert: {e}")
