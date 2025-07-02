# fl_client.py
from flower import client
import tensorflow as tf
def get_parameters(): return model.get_weights()
def fit(parameters, config):
    model.set_weights(parameters)
    # train on local data
    model.fit(local_dataset, epochs=1)
    return model.get_weights(), len(local_dataset), {}
client.start_numpy_client("grpc://flower-server:8080", 
    client=client.NumPyClient(get_parameters, fit, evaluate))
