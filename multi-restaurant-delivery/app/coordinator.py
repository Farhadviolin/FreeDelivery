from fastapi import FastAPI, Request
import tensorflow_federated as tff
from typing import Dict

app = FastAPI()
# Dummy model_fn for PoC
def model_fn():
    return tff.learning.models.from_keras_model(...)

iterative_process = tff.learning.build_federated_averaging_process(model_fn)
state = iterative_process.initialize()

@app.post("/federate")
async def federate(updates: Dict):
    global state
    # updates: list of client weights
    state, metrics = iterative_process.next(state, updates["weights"])
    return {"metrics": metrics}

@app.get("/model/weights")
async def get_weights():
    # Return current model weights (dummy)
    return {"weights": "..."}
