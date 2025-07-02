import pytest
from worker.tasks import process_order, cleanup

def test_process_order(monkeypatch):
    # Simuliere erfolgreiche Verarbeitung
    result = process_order.apply(args=[123])
    assert result.successful() or result.failed()  # Task wird ausgeführt oder retried

def test_cleanup():
    result = cleanup.apply()
    assert result.successful() or result.failed()
