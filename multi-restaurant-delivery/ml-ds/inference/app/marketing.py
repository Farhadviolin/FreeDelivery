import requests, os
API_URL = os.getenv("HUBSPOT_API", "")
API_KEY = os.getenv("HUBSPOT_KEY", "")

def push_segment(user_id: str, segment: str):
    data = {"properties": {"segment": segment}}
    requests.post(f"{API_URL}/contacts/v1/contact/vid/{user_id}/profile",
                  json=data, params={"hapikey": API_KEY})
