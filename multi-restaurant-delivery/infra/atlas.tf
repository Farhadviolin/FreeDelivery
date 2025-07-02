resource "atlas_entity" "postgres_db" {
  type_name = "hive_db"
  attributes = {
    name        = "delivery_postgres"
    qualifiedName = "delivery_postgres@cluster"
    description = "Primary application database"
  }
}
