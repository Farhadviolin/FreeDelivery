from pyspark.sql import SparkSession
from delta import *

builder = SparkSession.builder.appName("delta_writer") \
    .config("spark.sql.extensions","io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog","org.apache.spark.sql.delta.catalog.DeltaCatalog")
spark = configure_spark_with_delta_pip(builder).getOrCreate()

df = spark \
  .readStream \
  .format("kafka") \
  .option("subscribe","enriched-events") \
  .load() \
  .selectExpr("CAST(value AS STRING) as json") \
  .selectExpr("from_json(json, 'user_id STRING, event_type STRING, country STRING, ts TIMESTAMP') as data") \
  .select("data.*")

query = df.writeStream \
  .format("delta") \
  .option("checkpointLocation","s3://delta/checkpoints/enriched") \
  .start("s3://delta/enriched_events")
query.awaitTermination()
