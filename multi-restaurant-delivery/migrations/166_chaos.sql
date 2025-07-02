CREATE TABLE chaos_experiments (
  id SERIAL PRIMARY KEY,
  name TEXT,
  status TEXT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  metrics JSONB
);
