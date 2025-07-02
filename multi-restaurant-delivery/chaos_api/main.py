from fastapi import FastAPI
from kubernetes import client, config

app = FastAPI()
config.load_incluster_config()
api = client.CustomObjectsApi()

@app.post("/experiments/apply")
async def apply_experiment(body: dict):
    # body contains CRD YAML
    return api.create_namespaced_custom_object(
        group="chaosmesh.org", version="v1alpha1", namespace="delivery",
        plural="podchaos", body=body
    )
