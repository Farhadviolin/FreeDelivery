CREATE TABLE stock_items (
  id SERIAL PRIMARY KEY,
  product_id UUID NOT NULL,
  warehouse_id UUID NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  reserved INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE stock_movements (
  id BIGSERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES stock_items(id),
  delta INTEGER NOT NULL,
  reason TEXT,
  ts TIMESTAMPTZ DEFAULT now()
);
