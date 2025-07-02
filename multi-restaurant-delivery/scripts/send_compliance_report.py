# Compliance-Report E-Mail-Versand (Python)
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from pathlib import Path

def send_report():
    sender = 'compliance@delivery.com'
    recipient = 'audit-team@delivery.com'
    subject = 'Automatischer Compliance-Report'
    body = 'Im Anhang finden Sie den aktuellen Compliance-Report als HTML und JSON.'
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    for fname in ['compliance-report.html', 'compliance-report.json']:
        with open(fname, 'rb') as f:
            part = MIMEApplication(f.read(), Name=Path(fname).name)
            part['Content-Disposition'] = f'attachment; filename="{fname}"'
            msg.attach(part)
    with smtplib.SMTP('smtp.delivery.com', 587) as server:
        server.starttls()
        server.login('compliance@delivery.com', 'PASSWORD')
        server.send_message(msg)
    print('Compliance-Report per E-Mail versendet.')

if __name__ == "__main__":
    send_report()
