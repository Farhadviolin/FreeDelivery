import mlflow
import tensorflow as tf

def log_model_to_mlflow(model, run_name="federated_model"):
    with mlflow.start_run(run_name=run_name):
        mlflow.tensorflow.log_model(tf_saved_model_dir=model, artifact_path="model")
        mlflow.log_param("type", "federated")
        print("Model logged to MLflow.")
