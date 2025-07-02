from fastapi import APIRouter, Request
from .notification_service import send_email, send_sms, send_push

notification_router = APIRouter()

@notification_router.post('/notify/email')
def notify_email(request: Request):
    data = request.json() if hasattr(request, 'json') else {}
    to = data.get('to', 'demo@kiliefer.local')
    subject = data.get('subject', 'Demo Notification')
    body = data.get('body', 'Test')
    send_email(to, subject, body)
    return {"msg": "Email sent (demo)"}

@notification_router.post('/notify/sms')
def notify_sms(request: Request):
    data = request.json() if hasattr(request, 'json') else {}
    to = data.get('to', '+49123456789')
    body = data.get('body', 'Test')
    send_sms(to, body)
    return {"msg": "SMS sent (demo)"}

@notification_router.post('/notify/push')
def notify_push(request: Request):
    data = request.json() if hasattr(request, 'json') else {}
    user_id = data.get('user_id', 'demo')
    body = data.get('body', 'Test')
    send_push(user_id, body)
    return {"msg": "Push sent (demo)"}
