from cobrowse.service import app
from flask.testing import FlaskClient
import pytest

def test_start_cobrowse():
    client = app.test_client()
    resp = client.post('/cobrowse/start', json={'sessionId': 'abc123'})
    assert resp.status_code == 200
    assert resp.json['status'] == 'started'
    assert resp.json['sessionId'] == 'abc123'
