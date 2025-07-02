from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment

env = StreamExecutionEnvironment.get_execution_environment()
t_env = StreamTableEnvironment.create(env)

# Quelle: Kafka Topic 'order.created'
t_env.execute_sql("""
CREATE TABLE orders (
  order_id STRING,
  user_id STRING,
  amount DOUBLE,
  timestamp TIMESTAMP(3),
  WATERMARK FOR timestamp AS timestamp - INTERVAL '5' SECOND
) WITH ( ... kafka connector props ... );
""")

# Feature-Berechnung: z.B. avg order amount last hour
t_env.execute_sql("""
CREATE TABLE user_features AS
SELECT
  user_id,
  COUNT(*) OVER w AS order_count_last_hour,
  AVG(amount) OVER w AS avg_amount_last_hour,
  window_end
FROM orders
WINDOW w AS (PARTITION BY user_id 
            ORDER BY timestamp 
            RANGE BETWEEN INTERVAL '1' HOUR PRECEDING AND CURRENT ROW)
""")
# Schreibe Features in Feast Online Store via Connector
