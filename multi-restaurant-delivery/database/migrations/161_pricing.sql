CREATE TABLE regional_pricing (
  id SERIAL PRIMARY KEY,
  product_id UUID NOT NULL,
  region_code VARCHAR(2) NOT NULL,
  price_base NUMERIC(10,2) NOT NULL,  -- in USD
  UNIQUE(product_id, region_code)
);
