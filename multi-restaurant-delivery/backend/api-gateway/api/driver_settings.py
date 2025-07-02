# Backend-API für Fahrer-Settings und DSGVO-Export
from fastapi import APIRouter, Request, Response
import json

router = APIRouter()

@router.post('/driver/settings')
async def save_settings(request: Request):
    data = await request.json()
    # Hier: Settings speichern (DB, File, etc.)
    return {"status": "ok"}

@router.get('/driver/export')
async def export_driver_data():
    # Hier: Daten aus DB/Service holen
    data = {"orders": [], "profile": {"name": "Max Mustermann"}}
    return Response(json.dumps(data), media_type='application/json')
