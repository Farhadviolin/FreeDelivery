import json, requests, os
findings = json.load(open('compliance/reports/security_findings.json'))
for f in findings:
    payload = {
      "fields": {
        "project": {"key": "SEC"},
        "summary": f"{f['tool']} - {f['title']}",
        "description": f["description"],
        "issuetype": {"name": "Bug"}
      }
    }
    requests.post(
      f"https://jira.delivery.com/rest/api/2/issue",
      auth=(os.getenv("JIRA_USER"), os.getenv("JIRA_TOKEN")),
      json=payload
    )
