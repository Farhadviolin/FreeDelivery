SELECT
  'Views' AS step, SUM(views) AS count FROM analytics.funnels
UNION ALL
SELECT 'Adds', SUM(adds) FROM analytics.funnels
UNION ALL
SELECT 'Checkouts', SUM(checkouts) FROM analytics.funnels
UNION ALL
SELECT 'Purchases', SUM(purchases) FROM analytics.funnels;
