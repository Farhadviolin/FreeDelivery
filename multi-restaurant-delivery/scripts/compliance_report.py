# Automatisierter Compliance-Report (Python)
import requests
import json

def fetch_atlas_entities():
    r = requests.get('http://atlas:21000/api/atlas/v2/entity/bulk?typeName=hive_db')
    return r.json()

def fetch_macie_findings():
    # Annahme: Macie Findings API/Export
    return {"pii_findings": 3, "last_scan": "2025-07-01"}

def fetch_audit_logs():
    # Annahme: ELK API/Export
    return {"access_logs": 1234, "modification_logs": 12}

def main():
    report = {
        "atlas": fetch_atlas_entities(),
        "macie": fetch_macie_findings(),
        "audit": fetch_audit_logs(),
    }
    with open('compliance-report.json', 'w') as f:
        json.dump(report, f, indent=2)
    print("Compliance-Report erstellt: compliance-report.json")

if __name__ == "__main__":
    main()
