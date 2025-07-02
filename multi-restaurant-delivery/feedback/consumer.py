from kafka import KafkaConsumer
from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment

consumer = KafkaConsumer('repair.events', bootstrap_servers='kafka:9092')
env = StreamExecutionEnvironment.get_execution_environment()
# Analog zu Feature-Job, schreibe neue Labels/Features in Feast via Connector
