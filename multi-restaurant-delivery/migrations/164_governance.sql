CREATE TABLE model_cards (
  model_name TEXT PRIMARY KEY,
  version TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  author TEXT,
  description TEXT,
  data_sources JSONB,
  fairness_metrics JSONB,
  performance_metrics JSONB
);
