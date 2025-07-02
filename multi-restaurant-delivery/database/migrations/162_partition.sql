CREATE TABLE orders (
  order_id UUID,
  created_at TIMESTAMP,
  -- ... weitere Spalten ...
  PARTITION BY RANGE (created_at)
);
CREATE TABLE orders_2025_07 PARTITION OF orders FOR VALUES FROM ('2025-07-01') TO ('2025-08-01');
-- Weitere Monats-Partitionen nach Bedarf ...
