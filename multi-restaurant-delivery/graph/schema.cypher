CREATE CONSTRAINT restaurant_id_unique IF NOT EXISTS
  FOR (r:Restaurant) REQUIRE r.id IS UNIQUE;
CREATE CONSTRAINT user_id_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT menu_item_id_unique IF NOT EXISTS
  FOR (m:MenuItem) REQUIRE m.id IS UNIQUE;
