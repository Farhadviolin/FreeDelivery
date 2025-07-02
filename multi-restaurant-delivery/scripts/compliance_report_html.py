# Compliance-Report als HTML-Export
import json
from datetime import datetime

def main():
    with open('compliance-report.json') as f:
        data = json.load(f)
    html = f"""
    <html><head><title>Compliance Report</title></head><body>
    <h1>Compliance Report {datetime.now().strftime('%Y-%m-%d')}</h1>
    <h2>Atlas Entities</h2>
    <pre>{json.dumps(data['atlas'], indent=2)}</pre>
    <h2>PII Scan Results</h2>
    <pre>{json.dumps(data['macie'], indent=2)}</pre>
    <h2>Audit Logs</h2>
    <pre>{json.dumps(data['audit'], indent=2)}</pre>
    </body></html>
    """
    with open('compliance-report.html', 'w') as f:
        f.write(html)
    print("HTML-Report erstellt: compliance-report.html")

if __name__ == "__main__":
    main()
