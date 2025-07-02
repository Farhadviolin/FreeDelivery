import pdfkit, requests, os
from datetime import date
import smtplib
from email.message import EmailMessage

def send_email_with_attachment(subject, body, to, attachment_path):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = os.environ.get('SMTP_FROM', 'reports@delivery.com')
    msg['To'] = to
    msg.set_content(body)
    with open(attachment_path, 'rb') as f:
        msg.add_attachment(f.read(), maintype='application', subtype='pdf', filename=os.path.basename(attachment_path))
    with smtplib.SMTP(os.environ.get('SMTP_HOST', 'localhost'), int(os.environ.get('SMTP_PORT', 25))) as s:
        if os.environ.get('SMTP_USER') and os.environ.get('SMTP_PASS'):
            s.login(os.environ['SMTP_USER'], os.environ['SMTP_PASS'])
        s.send_message(msg)

def main():
    res = requests.get('https://dashboard.delivery.com/api/report?period=weekly')
    html = res.text
    output = f'reports/executive_report_{date.today()}.pdf'
    pdfkit.from_string(html, output)
    send_email_with_attachment(
        subject="Weekly Executive Report",
        body="Hier ist der aktuelle Executive-Report als PDF.",
        to="ceo@delivery.com",
        attachment_path=output
    )

if __name__ == "__main__":
    main()
