SELECT variant,
       COUNT(*) FILTER (WHERE event_type='click') AS clicks,
       COUNT(*) FILTER (WHERE event_type='purchase') AS conversions,
       ROUND(100.0 * SUM(CASE WHEN event_type='purchase' THEN 1 ELSE 0 END) 
             / SUM(CASE WHEN event_type IN ('click','purchase') THEN 1 ELSE 0 END),2)
       AS conversion_rate
FROM experiment_events
WHERE flag_key='checkout_button_color'
GROUP BY variant;
