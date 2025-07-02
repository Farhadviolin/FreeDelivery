# Zero-Trust Audit Log Example
import logging
import json
from datetime import datetime

def log_crypto_event(user_id, op_type, status, meta=None):
    entry = {
        'ts': datetime.utcnow().isoformat(),
        'user': user_id,
        'op': op_type,
        'status': status,
        'meta': meta or {}
    }
    with open('audit.log', 'a') as f:
        f.write(json.dumps(entry) + '\n')

# Beispiel-Log
if __name__ == "__main__":
    log_crypto_event('user42', 'encrypt', 'success', {'algo':'X25519'})
    log_crypto_event('user42', 'decrypt', 'fail', {'reason':'bad key'})
