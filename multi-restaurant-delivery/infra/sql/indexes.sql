-- Composite Index for frequent filter patterns
CREATE INDEX idx_orders_rest_day ON orders (restaurant_id, created_at DESC);

-- Graph DB Relationship Index
CREATE INDEX idx_user_ordered ON :User-[:ORDERED]-() OPTIONS {indexProvider: 'native-btree-1.0'};
