from kafka import KafkaConsumer
import psycopg2, json

consumer = KafkaConsumer('user.activity','campaign.events', bootstrap_servers='kafka:9092')
conn = psycopg2.connect("dbname=delivery user=app password=secret")
cur = conn.cursor()

for msg in consumer:
    post = json.loads(msg.value)
    cur.execute(
      "INSERT INTO feed_posts(id,type,content) VALUES(%s,%s,%s)",
      (post['id'], post['type'], json.dumps(post['content']))
    )
    conn.commit()
