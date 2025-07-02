CREATE MATERIALIZED VIEW realtime_orders AS
  SELECT event.payload['order_id'] AS order_id,
         event.ts AS ts,
         event.payload['total']::DOUBLE AS total
  FROM ENRICHED_EVENTS AS event;
