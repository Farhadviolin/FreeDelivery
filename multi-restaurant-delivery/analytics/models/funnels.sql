{{ config(materialized='table') }}
WITH events AS (
  SELECT
    user_pseudo_id AS user_id,
    event_name,
    TIMESTAMP_MICROS(event_timestamp) AS ts
  FROM `project.analytics.raw_events`
  WHERE event_name IN ('page_view','Add To Cart','Begin Checkout','Purchase')
    AND DATE(TIMESTAMP_MICROS(event_timestamp)) = CURRENT_DATE()
)
SELECT
  user_id,
  COUNTIF(event_name='page_view') AS views,
  COUNTIF(event_name='Add To Cart') AS adds,
  COUNTIF(event_name='Begin Checkout') AS checkouts,
  COUNTIF(event_name='Purchase') AS purchases
FROM events
GROUP BY user_id;
