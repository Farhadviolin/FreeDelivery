from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from py2neo import Graph
from kafka import KafkaConsumer
import json

def load_events_to_graph():
    graph = Graph("bolt://neo4j:7687", auth=("neo4j","secret"))
    consumer = KafkaConsumer('order.created','user.registered','menu.updated',
                             bootstrap_servers='kafka:9092',
                             value_deserializer=lambda m: json.loads(m))
    for msg in consumer:
        ev = msg.value
        if msg.topic == 'user.registered':
            graph.run("MERGE (u:User {id:$id, name:$name})", id=ev['id'], name=ev['name'])
        elif msg.topic == 'menu.updated':
            graph.run("""
              MERGE (m:MenuItem {id:$id, name:$name})
              MERGE (r:Restaurant {id:$restId})
              MERGE (r)-[:OFFERS]->(m)
            """, id=ev['item']['id'], name=ev['item']['name'], restId=ev['restaurantId'])
        elif msg.topic == 'order.created':
            graph.run("""
              MATCH (u:User {id:$userId}), (m:MenuItem {id:$itemId})
              CREATE (u)-[:ORDERED {ts:$ts}]->(m)
            """, userId=ev['userId'], itemId=ev['itemId'], ts=ev['timestamp'])

with DAG('graph_etl', start_date=datetime(2025,7,1), schedule_interval='@hourly', catchup=False) as dag:
    PythonOperator(task_id='load_to_graph', python_callable=load_events_to_graph)
