from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, TimestampType

spark = SparkSession.builder.appName('IngestBronze').getOrCreate()

schema = StructType([
    StructField('event_id', StringType()),
    StructField('user_id', StringType()),
    StructField('event_type', StringType()),
    StructField('ts', TimestampType()),
])

df = spark.read.format('kafka').option('subscribe','delivery_events').load()
df_parsed = df.selectExpr("CAST(value AS STRING) as json") \
    .selectExpr("from_json(json, schema) as data").select("data.*")
df_parsed.write.mode('append').parquet('s3://mycompany-lake/bronze/events/')
