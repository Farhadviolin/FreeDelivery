INSERT INTO stock_items (product_id, warehouse_id, quantity, reserved) VALUES
  ('prod1', 'wh1', 100, 0),
  ('prod2', 'wh1', 50, 5),
  ('prod3', 'wh2', 200, 10);

INSERT INTO stock_movements (item_id, delta, reason) VALUES
  (1, 100, 'initial'),
  (2, 50, 'initial'),
  (3, 200, 'initial');
