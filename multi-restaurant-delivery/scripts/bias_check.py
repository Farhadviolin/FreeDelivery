import pandas as pd
from fairlearn.metrics import MetricFrame, selection_rate, false_positive_rate
import json

df = pd.read_csv("data/eval.csv")
y_true, y_pred, sensitive = df["label"], df["prediction"], df["gender"]
mf = MetricFrame(
  metrics={"selection_rate": selection_rate, "fpr": false_positive_rate},
  y_true=y_true, y_pred=y_pred, sensitive_features=sensitive
)
report = mf.overall.to_dict()
df_group = mf.by_group.to_dict()
print(json.dumps({"overall":report, "by_group":df_group}, indent=2))
