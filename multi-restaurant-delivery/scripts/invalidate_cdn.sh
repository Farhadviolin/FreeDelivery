#!/usr/bin/env bash
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
echo "Invalidation submitted for Distribution $DISTRIBUTION_ID"
