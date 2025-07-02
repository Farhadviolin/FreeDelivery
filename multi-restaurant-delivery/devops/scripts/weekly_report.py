# weekly_report.py
import requests, datetime, smtplib

# Fetch Grafana dashboard snapshot
end = datetime.date.today()
start = end - datetime.timedelta(days=7)
grafana_api = 'https://grafana.company.com/api/dashboards/uid/ops_health/snapshot'
resp = requests.post(grafana_api, json={'expires': 3600})
snapshot_url = resp.json().get('url', 'N/A')

# Mail report
msg = f"Weekly Health Report: {start} to {end}\nDashboard: {snapshot_url}"
with smtplib.SMTP('smtp.company.com') as s:
    s.sendmail('noreply@company.com', ['team@company.com'], msg)
print("Weekly report sent.")
