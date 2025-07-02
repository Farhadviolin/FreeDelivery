spark-sql <<EOF
CREATE TABLE iceberg.db.orders (
  order_id STRING,
  created_at TIMESTAMP,
  -- ... weitere Spalten ...
) USING iceberg
LOCATION 's3://delivery-archive/orders/';
EOF
