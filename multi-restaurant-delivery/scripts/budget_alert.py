import os, smtplib
from email.message import EmailMessage
import pandas as pd, sqlalchemy

engine = sqlalchemy.create_engine(os.getenv('FINOPS_DB_URL'))
df = pd.read_sql('SELECT * FROM monthly_costs', engine)
total = df['BlendedCost'].sum()
if total > 10000:  # Beispielbudget
    msg = EmailMessage()
    msg.set_content(f"Warnung: Monatliche Kosten haben {total}$ überschritten.")
    msg['Subject'] = "FinOps Budget Alert"
    msg['From'] = "finops@delivery.com"
    msg['To'] = "team@delivery.com"
    with smtplib.SMTP('smtp.delivery.com') as s:
        s.send_message(msg)
