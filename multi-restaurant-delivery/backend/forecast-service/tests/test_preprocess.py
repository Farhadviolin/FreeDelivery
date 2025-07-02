# pytest for forecast consumer
import pytest
from forecast_consumer import preprocess

def test_preprocess():
    data = {"restaurant_id": 1, "timestamp": "2025-07-01T12:00:00Z", "items": [1,2,3]}
    df = preprocess(data)
    assert df is not None
