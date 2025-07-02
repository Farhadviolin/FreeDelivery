# Test für IsolationForest-basierte Anomalieerkennung
from sklearn.ensemble import IsolationForest
import numpy as np

def test_isolation_forest():
    X = np.array([[100],[102],[98],[101],[500]])
    model = IsolationForest(contamination=0.2)
    preds = model.fit_predict(X)
    assert preds[-1] == -1  # Der Ausreißer (500) muss erkannt werden

test_isolation_forest()
