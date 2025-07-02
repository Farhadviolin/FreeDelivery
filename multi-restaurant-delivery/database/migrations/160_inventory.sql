CREATE TABLE inventory (
  product_id UUID PRIMARY KEY,
  available BIGINT NOT NULL,
  reserved BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);
