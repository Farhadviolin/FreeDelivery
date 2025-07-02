import requests
def check_and_block(order_id):
    resp = requests.post(f"http://fraud-service/score/{order_id}")
    score = resp.json()['fraud_score']
    if score > 0.8:
        # blockiere oder markiere zur manuellen Prüfung
        requests.post(f"http://order-service/block/{order_id}")
