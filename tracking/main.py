from fastapi import FastAPI, Request
import sqlalchemy, datetime
import redis
import json

app = FastAPI()
db = sqlalchemy.create_engine("postgresql://...")
cache = redis.Redis.from_url("redis://redis:6379")

@app.get("/r/{campaign_id}")
async def track(campaign_id: str, request: Request):
    scan_data = {
        "campaign_id": campaign_id,
        "ip": request.client.host,
        "ua": request.headers.get('user-agent'),
        "ts": datetime.datetime.utcnow().isoformat()
    }
    with db.begin() as conn:
        conn.execute("INSERT INTO scans(campaign_id, ip, ua, ts) VALUES (%s, %s, %s, %s)",
                     (campaign_id, scan_data["ip"], scan_data["ua"], scan_data["ts"]))
    cache.lpush(f"scans:{campaign_id}", json.dumps(scan_data))
    return {"redirect": f"/landing?campaign={campaign_id}"}

@app.post("/batch_push_hubspot")
def batch_push_hubspot():
    # Dummy: Batch alle Scans aus Redis und sende an HubSpot/Braze
    for key in cache.scan_iter("scans:*"):
        while cache.llen(key):
            scan = json.loads(cache.rpop(key))
            # hier HubSpot/Braze-API call
    return {"status": "ok"}
