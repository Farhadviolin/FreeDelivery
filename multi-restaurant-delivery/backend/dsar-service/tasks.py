from celery import shared_task
from django.core.mail import send_mail
from .models import DSARRequest
@shared_task
def process_dsar(request_id):
    req = DSARRequest.objects.get(id=request_id)
    data = req.user.export_all_data()
    archive = create_encrypted_zip(data)
    s3_key = upload_to_s3(archive)
    send_mail("Ihre Daten sind bereit", f"Download: {s3_key}", "noreply@service", [req.user.email])
