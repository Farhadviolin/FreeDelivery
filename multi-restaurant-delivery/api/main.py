from fastapi import FastAPI
import materialize

app = FastAPI()

@app.get("/metrics/orders/latest")
def latest_orders(limit: int = 10):
    rows = materialize.execute("SELECT * FROM realtime_orders ORDER BY ts DESC LIMIT %s", (limit,))
    return rows
