from kafka import KafkaConsumer
import psycopg2, json

consumer = KafkaConsumer('xr_events', bootstrap_servers='kafka:9092')
conn = psycopg2.connect("dbname=xr user=app password=secret")
cur = conn.cursor()

for msg in consumer:
    data = json.loads(msg.value)
    cur.execute("""
      INSERT INTO xr_events(user_id, event_type, details, ts)
      VALUES (%s, %s, %s, NOW())
    """, (data['userId'], data['eventType'], json.dumps(data['details'])))
    conn.commit()
