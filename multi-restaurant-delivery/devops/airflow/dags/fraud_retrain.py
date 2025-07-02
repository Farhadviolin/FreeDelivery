from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def train_model():
    import pandas as pd, xgboost as xgb, sqlalchemy
    engine = sqlalchemy.create_engine('postgresql://user:pass@pg:5432/labels')
    df = pd.read_sql("SELECT * FROM fraud_labels", engine)
    features = [c for c in df.columns if c not in ('label','tx_id')]
    dtrain = xgb.DMatrix(df[features], label=df["label"])
    model = xgb.train({}, dtrain)
    model.save_model("fraud_model.xgb")
    # fs.materialize_incremental(end_date=datetime.utcnow())

with DAG("fraud_retrain", start_date=datetime(2025,7,1),
         schedule_interval="@daily", catchup=False) as dag:
    PythonOperator(task_id="retrain", python_callable=train_model)
