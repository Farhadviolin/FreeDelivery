from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import pandas as pd, xgboost as xgb
from feast import FeatureStore
from mlflow import log_model

def train_segment_model():
    fs = FeatureStore(repo_path="infra/feature_repo")
    # Offline-Features und Labels (Churn, LTV, Recency/... )
    df = fs.get_historical_features(
        entity_df=pd.DataFrame({'user_id': [...], 'event_timestamp': [...] }),
        feature_refs=['user:total_orders','user:avg_order_value']
    ).to_df()
    X = df[['user_total_orders','user_avg_order_value']]
    y = df['label_segment']  # prepared label column
    model = xgb.XGBClassifier().fit(X, y)
    log_model(model, "customer_segment_model")
    fs.materialize_incremental(end_date=datetime.utcnow())

with DAG('segment_train', start_date=datetime(2025,7,1), schedule_interval='@daily', catchup=False) as dag:
    PythonOperator(task_id='train_segment', python_callable=train_segment_model)
