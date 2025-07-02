from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment

env = StreamExecutionEnvironment.get_execution_environment()
t_env = StreamTableEnvironment.create(env)

# Source: raw events
t_env.execute_sql("""
CREATE TABLE raw_events (
  user_id STRING,
  event_type STRING,
  payload MAP<STRING,STRING>,
  ts TIMESTAMP(3),
  WATERMARK FOR ts AS ts - INTERVAL '5' SECOND
) WITH ( ... kafka connector ... );
""")

# Enrichment: add geo from lookup table
t_env.execute_sql("""
CREATE TABLE enriched_events WITH (
  'connector' = 'kafka',
  'topic' = 'enriched-events',
  ...
) AS
SELECT 
  e.user_id,
  e.event_type,
  e.payload,
  geo.country,
  e.ts
FROM raw_events AS e
LEFT JOIN geo_lookup FOR SYSTEM_TIME AS OF e.ts AS geo
  ON e.payload['ip'] = geo.ip;
""")
