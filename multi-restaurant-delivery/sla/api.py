from fastapi import FastAPI, Request
import requests, os

app = FastAPI()

@app.post("/alerts")
async def handle_alert(request: Request):
    alert = await request.json()
    # Create Jira ticket
    summary = alert['alerts'][0]['annotations']['summary']
    desc = alert['alerts'][0]['annotations']['description']
    requests.post(
      "https://jira.delivery.com/rest/api/2/issue",
      auth=(os.getenv("JIRA_USER"), os.getenv("JIRA_TOKEN")),
      json={
        "fields": {
          "project": {"key": "OPS"},
          "summary": summary,
          "description": desc,
          "issuetype": {"name": "Incident"}
        }
      }
    )
    return {"status": "ticket_created"}
