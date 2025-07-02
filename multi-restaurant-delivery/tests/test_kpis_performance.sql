WITH q AS (
  SELECT * FROM {{ ref('kpis_partitioned') }} WHERE day >= CURRENT_DATE - INTERVAL '7 days'
)
SELECT COUNT(*) FROM q;
