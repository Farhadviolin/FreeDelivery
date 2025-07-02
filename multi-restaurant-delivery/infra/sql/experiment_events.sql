CREATE TABLE experiment_events (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  flag_key TEXT,
  variant TEXT,
  event_type TEXT,
  ts TIMESTAMPTZ DEFAULT now()
);
