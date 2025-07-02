from flask import Flask, request
import psycopg2, os
app = Flask(__name__)
conn = psycopg2.connect(os.environ["DATABASE_URL"])

@app.route("/case", methods=["POST"])
def create_case():
    data = request.json
    with conn.cursor() as cur:
        cur.execute("INSERT INTO fraud_cases(tx_id, score, created_at) VALUES (%s,%s,NOW())",
                    (data["tx_id"], data["score"]))
        conn.commit()
    return "", 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8084)
