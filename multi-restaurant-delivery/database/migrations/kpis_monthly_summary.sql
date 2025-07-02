CREATE TABLE IF NOT EXISTS kpis.monthly_summary (
  period DATE PRIMARY KEY,
  total_orders BIGINT,
  total_revenue NUMERIC(12,2),
  avg_delivery_time INTERVAL,
  sla_compliance_pct NUMERIC(5,2)
);
