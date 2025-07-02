{{ config(
    materialized='incremental',
    partition_by={'field': 'day', 'data_type': 'date'},
    cluster_by=['restaurant_id']
) }}

WITH orders AS (
  SELECT
    CAST(created_at AS DATE) AS day,
    restaurant_id,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS revenue
  FROM {{ ref('orders') }}
  WHERE created_at >= (SELECT MAX(day) FROM {{ this }})::timestamp - INTERVAL '30 days'
  GROUP BY 1,2
)
SELECT * FROM orders
