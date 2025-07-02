from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def generate_report(**context):
    import pandas as pd
    from reportlab.platypus import SimpleDocTemplate, Paragraph
    from reportlab.lib.styles import getSampleStyleSheet
    import sqlalchemy

    engine = sqlalchemy.create_engine(context['params']['db_url'])
    df = pd.read_sql("SELECT * FROM kpis.monthly_summary ORDER BY period DESC LIMIT 12", engine)
    doc = SimpleDocTemplate("/reports/executive_report.pdf")
    styles = getSampleStyleSheet()
    story = [Paragraph("Executive Dashboard – Letzte 12 Monate", styles['Title'])]
    for _, row in df.iterrows():
        story.append(Paragraph(f"{row.period}: {row.total_orders} Orders, €{row.total_revenue}", styles['Normal']))
    doc.build(story)

with DAG('exec_report', start_date=datetime(2025,7,1),
         schedule_interval='@monthly', catchup=False) as dag:
    task = PythonOperator(
        task_id='generate_report',
        python_callable=generate_report,
        params={'db_url': 'postgresql://user:pass@pg:5432/kpi_db'}
    )
