-- Beispiel: Interaktionen und Verweildauer pro User
SELECT user_id, event_type, COUNT(*) AS events, MIN(ts) AS first, MAX(ts) AS last,
  EXTRACT(EPOCH FROM (MAX(ts)-MIN(ts))) AS dwell_seconds
FROM xr_events
GROUP BY user_id, event_type
ORDER BY events DESC;
