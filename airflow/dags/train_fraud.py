from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from feast import FeatureStore
import pandas as pd, xgboost as xgb, mlflow

def train_fraud_model():
    fs = FeatureStore(repo_path="infra/feature_repo")
    df = fs.get_historical_features(
      entity_df=pd.DataFrame({
        'order_id': [...],
        'event_timestamp': [...]
      }),
      feature_refs=[
        'fraud_features:order_count_last_hour',
        'fraud_features:avg_amount_last_hour',
        # weitere Features...
      ]
    ).to_df()
    y = df['label_is_fraud']
    X = df.drop(columns=['order_id','event_timestamp','label_is_fraud'])
    model = xgb.XGBClassifier(scale_pos_weight=10).fit(X, y)
    mlflow.xgboost.log_model(model, "fraud_model")
    fs.materialize_incremental(end_date=datetime.utcnow())

with DAG('train_fraud', start_date=datetime(2025,7,1), schedule_interval='@daily', catchup=False) as dag:
    train = PythonOperator(task_id='train_fraud', python_callable=train_fraud_model)
