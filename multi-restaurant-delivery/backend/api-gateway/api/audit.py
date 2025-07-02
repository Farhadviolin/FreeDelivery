# Audit- und Compliance-Export
from fastapi import APIRouter, Response
import csv
import json
from io import StringIO

router = APIRouter()

AUDIT_LOGS = [
    {"id": 1, "user": "alice", "action": "login", "timestamp": "2023-01-01T12:00:00"},
    {"id": 2, "user": "bob", "action": "order", "timestamp": "2023-01-01T13:00:00"},
]

@router.get("/audit/export/csv")
def export_csv():
    si = StringIO()
    writer = csv.DictWriter(si, fieldnames=["id", "user", "action", "timestamp"])
    writer.writeheader()
    writer.writerows(AUDIT_LOGS)
    return Response(si.getvalue(), media_type="text/csv")

@router.get("/audit/export/json")
def export_json():
    return Response(json.dumps(AUDIT_LOGS), media_type="application/json")
