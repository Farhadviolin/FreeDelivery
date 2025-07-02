import pytest
from fastapi.testclient import TestClient
from vault_proxy.main import app

client = TestClient(app)

def test_encrypt_decrypt_roundtrip(monkeypatch):
    # Mock hvac client
    class DummyClient:
        class secrets:
            class transit:
                @staticmethod
                def encrypt_data(name, plaintext):
                    return {'data': {'ciphertext': 'vault:enc:' + plaintext}}
                @staticmethod
                def decrypt_data(name, ciphertext):
                    return {'data': {'plaintext': ciphertext.replace('vault:enc:', '')}}
    monkeypatch.setattr('vault_proxy.main.client', DummyClient())
    resp = client.post('/encrypt', json={'plaintext': 'dGVzdA=='})
    assert resp.status_code == 200
    ciphertext = resp.json()['ciphertext']
    resp2 = client.post('/decrypt', json={'ciphertext': ciphertext})
    assert resp2.status_code == 200
    assert resp2.json()['plaintext'] == 'dGVzdA=='
