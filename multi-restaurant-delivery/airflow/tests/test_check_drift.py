import pytest
from airflow.dags.check_drift import run_drift_check
import os

def test_run_drift_check_creates_report(monkeypatch):
    class DummyDashboard:
        def calculate(self, ref_data, current_data): pass
        def save(self, path):
            with open(path, 'w') as f:
                f.write('dummy report')
        def _save(self):
            return {'data_drift': {'metrics': {'dataset_drift': 1}}}
    monkeypatch.setattr('airflow.dags.check_drift.Dashboard', lambda tabs: DummyDashboard())
    monkeypatch.setattr('airflow.dags.check_drift.FeatureStore', lambda repo_path: None)
    monkeypatch.setattr('airflow.dags.check_drift.pd', type('pd', (), {'DataFrame': lambda *a, **kw: []}))
    monkeypatch.setattr('airflow.dags.check_drift.push_to_gateway', lambda *a, **kw: None)
    run_drift_check()
    assert os.path.exists('dags/reports/pm_drift.html')
    os.remove('dags/reports/pm_drift.html')
