CREATE TABLE dsar_requests (
  id SERIAL PRIMARY KEY,
  subject_id TEXT NOT NULL,
  request_type TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE dsar_audit (
  id SERIAL PRIMARY KEY,
  request_id INTEGER REFERENCES dsar_requests(id),
  action TEXT,
  performed_at TIMESTAMPTZ DEFAULT now(),
  details JSONB
);
