# incidents.sql
CREATE TABLE IF NOT EXISTS incidents (
  id SERIAL PRIMARY KEY,
  service TEXT NOT NULL,
  alert TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  status TEXT NOT NULL
);
