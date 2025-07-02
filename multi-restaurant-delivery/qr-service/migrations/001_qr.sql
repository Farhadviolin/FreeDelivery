CREATE TABLE qr_codes (
  id UUID PRIMARY KEY,
  campaign TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
