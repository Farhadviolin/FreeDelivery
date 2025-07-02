# sustainability_dashboard.md

## Sustainability Metrics & Green IT

### 1. Energy Usage Monitoring
- Prometheus + Node Exporter: On-Prem & Edge
- Cloud Energy Metrics: CloudWatch, Azure Monitor, GCP Monitoring

### 2. Carbon Footprint Tracking
- Kubecost Carbon Cost: Aktiviert (`carbon_cost.yaml`)
- Python-Skript für monatliche CO₂-Berechnung (`carbon_calc.py`)

### 3. Green IT Practices
- Terraform Rightsizing Module (`rightsizing_module.tf`)
- Ansible Playbook für Spot Instances (`spot_playbook.yml`)
- Autoscaling, Rightsizing, Spot-Strategien dokumentiert

### 4. Reporting & KPIs
- Grafana Sustainability Dashboard: kWh, CO₂, Cost-per-Carbon
- Wöchentlicher/Monatlicher Report an Stakeholder

### 5. Optimization Workflows
- Automatisierte Empfehlungen via Rightsizing-Plan
- Playbook-Check in CI/CD (`sustainability.yml`)

---

Siehe auch: `devops/monitoring/`, `devops/kubecost/`, `devops/scripts/`, `.github/workflows/sustainability.yml`
