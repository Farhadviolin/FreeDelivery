import pandas as pd
from pyod.models.iforest import IForest
import mlflow

# Historische Features aus Data Lake laden
df = pd.read_parquet("s3://delta/preprocessed/*.parquet")
X = df[['mean_val','std_val']].values

clf = IForest(contamination=0.01).fit(X)
with mlflow.start_run():
    mlflow.pyfunc.log_model("anomaly_detector", python_model=clf)
