from fastapi import FastAPI
from temporalio.client import Client
import uuid

app = FastAPI()
client = Client.connect("temporal:7233")

@app.post("/campaigns/{campaign_id}/start")
async def start_campaign(campaign_id: str, user_id: str):
    run = await client.start_workflow(
        "notificationWorkflow",
        user_id, campaign_id,
        id=f"notif-{user_id}-{campaign_id}-{uuid.uuid4()}",
        task_queue="notification"
    )
    return {"run_id": run.run_id}
