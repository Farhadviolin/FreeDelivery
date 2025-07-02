CREATE TABLE xr_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  event_type TEXT,
  details JSONB,
  ts TIMESTAMPTZ DEFAULT now()
);
