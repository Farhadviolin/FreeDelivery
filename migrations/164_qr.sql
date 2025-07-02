CREATE TABLE campaign (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  target_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE scans (
  id SERIAL PRIMARY KEY,
  campaign_id UUID REFERENCES campaign(id),
  ip INET,
  ua TEXT,
  ts TIMESTAMPTZ DEFAULT now()
);
