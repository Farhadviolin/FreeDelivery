from fastapi import FastAPI
import psycopg2

app = FastAPI()
conn = psycopg2.connect(...)

@app.get("/segment/{user_id}")
def get_segment(user_id: str):
    cur = conn.cursor()
    cur.execute("SELECT segment, propensity FROM user_segments JOIN user_propensity USING(user_id) WHERE user_id=%s", (user_id,))
    seg, prop = cur.fetchone()
    return {"segment": seg, "propensity": prop}
