import pandas as pd
from sklearn.cluster import KMeans
from xgboost import XGBClassifier
import mlflow

# DB_CONN should be set up with your DB connection
DB_CONN = ...

def train_segments():
    df = pd.read_sql('SELECT * FROM user_features', con=DB_CONN)
    kmeans = KMeans(n_clusters=5).fit(df)
    df['segment'] = kmeans.labels_
    df.to_sql('user_segments', con=DB_CONN, if_exists='replace')
    mlflow.sklearn.log_model(kmeans, 'kmeans_segments')

def score_propensity():
    df = pd.read_sql('SELECT * FROM user_features', con=DB_CONN)
    model = mlflow.sklearn.load_model('models:/propensity/Production')
    df['propensity'] = model.predict_proba(df)[:,1]
    df[['user_id','propensity']].to_sql('user_propensity', con=DB_CONN, if_exists='replace')
