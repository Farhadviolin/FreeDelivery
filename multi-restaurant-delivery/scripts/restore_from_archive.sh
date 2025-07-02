#!/bin/bash
# Self-Service Restore Script for Analytics Teams
# Usage: ./restore_from_archive.sh <order_id> <restore_date>

ORDER_ID="$1"
RESTORE_DATE="$2"

# Download partition from S3 Glacier/IA to local
aws s3 cp s3://delivery-archive/orders/partition_$RESTORE_DATE.parquet ./

# Restore to Iceberg table (example with Spark SQL)
spark-sql <<EOF
INSERT INTO iceberg.db.orders SELECT * FROM parquet.`partition_$RESTORE_DATE.parquet` WHERE order_id = '$ORDER_ID';
EOF

echo "Restore for order $ORDER_ID from $RESTORE_DATE completed."
