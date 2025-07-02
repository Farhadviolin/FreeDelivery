import pandas as pd
from sklearn.metrics import classification_report

# Beispiel: Annahme, dass model und features geladen sind
df = pd.read_csv('training_data.csv')
y_true = df['label']
y_pred = model.predict(df[features])
report = classification_report(y_true, y_pred, output_dict=True)
pd.DataFrame(report).to_json('bias_report.json', orient='index')
