import smtplib
from email.mime.text import MIMEText
import os

# E-Mail Notification (Demo, SMTP)
def send_email(to, subject, body):
    smtp_host = os.getenv('SMTP_HOST', 'localhost')
    smtp_port = int(os.getenv('SMTP_PORT', 1025))
    from_addr = os.getenv('SMTP_FROM', 'noreply@kiliefer.local')
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = from_addr
    msg['To'] = to
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.sendmail(from_addr, [to], msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

# SMS Notification (Demo, Twilio-like)
def send_sms(to, body):
    print(f"SMS to {to}: {body}")
    return True

# Push Notification (Demo)
def send_push(user_id, body):
    print(f"Push to {user_id}: {body}")
    return True
