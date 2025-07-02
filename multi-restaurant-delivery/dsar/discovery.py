from elasticsearch import Elasticsearch
import zipfile, os

def discover_and_export(subject_id):
    es = Elasticsearch(["es:9200"])
    # Suche in allen Indizes
    res = es.search(index="*", body={"query":{"term":{"user_id":subject_id}}}, size=10000)
    lines = [hit["_source"] for hit in res["hits"]["hits"]]
    out = f"/exports/{subject_id}.json"
    with open(out, "w") as f:
        import json; json.dump(lines, f)
    # ZIP ggf.
