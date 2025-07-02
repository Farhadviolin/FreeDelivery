from fastapi import FastAPI
from feast import FeatureStore
import mlflow
import joblib

app = FastAPI()
store = FeatureStore(repo_path="infra/feature_repo")
model = mlflow.pyfunc.load_model("models:/predictive_maintenance_model/Production")

@app.get("/predict/{vehicle_id}")
async def predict(vehicle_id: str):
    # Online-Features
    features = store.get_online_features(
        feature_refs=["vehicle:temp_last","vehicle:vib_last"],
        entity_rows=[{"vehicle_id": vehicle_id}]
    ).to_df()
    prob = model.predict_proba(features)[0][1]
    return {"vehicle_id": vehicle_id, "failure_risk": prob}
