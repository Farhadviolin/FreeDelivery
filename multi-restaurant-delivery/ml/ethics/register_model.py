import mlflow
mlflow.register_model("runs:/<run_id>/model", "DeliveryPlatformModels")
mlflow.set_tag("approved_by", "KI-Governance-Board")
