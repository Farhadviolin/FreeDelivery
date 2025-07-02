import requests

API_URL = "http://localhost:8000/enqueue-order"
order_id = 123
resp = requests.post(API_URL, json={"order_id": order_id})
print(resp.json())
