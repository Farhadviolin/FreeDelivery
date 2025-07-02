import pandas as pd
from sqlalchemy import create_engine
import requests

def generate_reorder():
    eng = create_engine("postgresql://user:pass@db:5432/inventory")
    df = pd.read_sql("SELECT product_id, SUM(quantity) AS qty FROM stock_movements WHERE ts > now() - interval '7 days' GROUP BY product_id", eng)
    for _, row in df.iterrows():
        if row.qty < threshold_for(row.product_id):
            requests.post("https://supplier.api/reorder", json={"product_id":row.product_id, "qty":row.qty*2})
