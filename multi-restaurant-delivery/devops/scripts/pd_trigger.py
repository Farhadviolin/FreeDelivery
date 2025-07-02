# pd_trigger.py
import pypd, argparse

def trigger_pd(service_key, summary):
    inc = pypd.Incident.create(data={
        "type": "incident",
        "title": summary,
        "service": {"id": service_key, "type": "service_reference"},
        "urgency": "high"
    })
    return inc.id

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--service_key', required=True)
    parser.add_argument('--summary', required=True)
    args = parser.parse_args()
    print(trigger_pd(args.service_key, args.summary))
