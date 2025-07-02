Invoke-WebRequest -Uri http://localhost:8000/alerts -Method POST -InFile .\sla\test_alert.json -ContentType "application/json"
