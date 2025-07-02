import pickle
import numpy as np
from sklearn.linear_model import LogisticRegression

def load_model():
    # Dummy-Model für Demo-Zwecke
    class DummyModel:
        def predict(self, X):
            # Simuliere Scores für 10 Items
            return np.random.rand(X.shape[0], 10)
    return DummyModel()
