from prometheus_client import start_http_server, Summary
round_time = Summary('fed_round_duration_seconds','Duration of federated round')

def start_metrics_server():
    start_http_server(8001)

@round_time.time()
def federate_round():
    # Dummy federated round
    pass
