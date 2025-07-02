# incident_service.py
from flask import Flask, request
import psycopg2, os
app = Flask(__name__)
conn = psycopg2.connect(os.environ['DATABASE_URL'])

@app.route('/incident', methods=['POST'])
def create_incident():
    data = request.json
    with conn.cursor() as cur:
        cur.execute("""
          INSERT INTO incidents(service, alert, timestamp, status)
          VALUES (%s,%s,NOW(),'open')""",
          (data['service'], data['alert']))
        conn.commit()
    return '', 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082)
