import json
zap = json.load(open('zap_report.json'))
trivy = json.load(open('trivy_report.json'))
exploits = json.load(open('gauntlt_results.json'))
findings = zap['alerts'] + trivy + exploits
with open('compliance/reports/security_findings.json','w') as f:
    json.dump(findings, f)
print("Compiled security findings:", len(findings))
