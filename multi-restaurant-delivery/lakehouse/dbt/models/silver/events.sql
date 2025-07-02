{{ config(materialized='incremental', unique_key='event_id') }}
WITH bronze AS (
  SELECT * FROM PARQUET_SCAN('s3://mycompany-lake/bronze/events/') 
)
SELECT
  event_id, user_id, event_type, ts
FROM bronze
WHERE ts > (SELECT MAX(ts) FROM {{ this }})
