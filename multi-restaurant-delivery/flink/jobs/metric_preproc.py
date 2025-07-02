from pyflink.table import StreamTableEnvironment, EnvironmentSettings

# Einlesen von Prometheus-Metrik-Stream über Kafka
env_settings = EnvironmentSettings.in_streaming_mode()
t_env = StreamTableEnvironment.create(settings=env_settings)

t_env.execute_sql("""
CREATE TABLE metrics (
  __name__ STRING,
  instance STRING,
  job STRING,
  value DOUBLE,
  ts TIMESTAMP(3),
  WATERMARK FOR ts AS ts - INTERVAL '2' SECOND
) WITH ( ... kafka connector props ... );
""")

# Feature: Rolling Statistics (Mean, Std) über Fenster
t_env.execute_sql("""
CREATE TABLE preprocessed AS
SELECT
  __name__,
  instance,
  TUMBLE_END(ts, INTERVAL '1' MINUTE) AS window_end,
  AVG(value) AS mean_val,
  STDDEV_POP(value) AS std_val
FROM metrics
GROUP BY TUMBLE(ts, INTERVAL '1' MINUTE), __name__, instance;
""")
