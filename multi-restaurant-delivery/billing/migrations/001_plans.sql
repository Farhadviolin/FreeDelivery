CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  price_id TEXT,
  quota_per_month INTEGER
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  customer_id TEXT,
  plan_id INTEGER REFERENCES plans(id),
  status TEXT,
  started_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);
