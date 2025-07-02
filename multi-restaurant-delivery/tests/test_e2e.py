import requests

def test_inventory_reservation():
    r = requests.post('http://localhost:8000/adjust', params={"product_id":"prod1","warehouse_id":"wh1","delta":100})
    assert r.status_code == 200
    r = requests.post('http://localhost:8000/reserve', json={"product_id":"prod1","warehouse_id":"wh1","qty":5})
    assert r.status_code == 200
    assert r.json()["status"] == "reserved"

def test_dsar_request():
    r = requests.post('http://localhost:8000/dsar', json={"subject_id":"user1","request_type":"access"})
    assert r.status_code == 200
    r = requests.get('http://localhost:8000/dsar/user1')
    assert r.status_code == 200
