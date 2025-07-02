# sim_consumer.py (SimPy + Kafka)
from simpy import Environment, Resource
from kafka import KafkaConsumer
import psycopg
env = Environment()
consumer = KafkaConsumer("kitchen-events", bootstrap_servers="kafka:9092")
conn = psycopg.connect("dbname=sim user=sim")
def kitchen_process(env, cook_station):
    yield env.timeout(prepare_time)
while True:
    msg = next(consumer)
    data = msg.value
    prepare_time = data["menu_item"]["prep_time"]
    cook = Resource(env, capacity=data["stations"])
    env.process(kitchen_process(env, cook))
    env.run(until=env.now + 60)  # 1-Minute-Intervalle
    # Persist metrics to TimescaleDB...
