resource "elasticsearch_index_template" "menu_items" {
  name           = "menu_items_template"
  index_patterns = ["menu-items-*"]
  template {
    settings = {
      "index.number_of_shards"   = 3
      "index.number_of_replicas" = 1
      "analysis" = {
        "analyzer" = {
          "my_analyzer" = {
            "type"      = "custom"
            "tokenizer" = "standard"
            "filter"    = ["lowercase", "asciifolding", "stemmer"]
          }
        }
        "filter" = {
          "stemmer" = {
            "type"     = "stemmer"
            "language" = "light_german"
          }
        }
      }
    }
    mappings = {
      properties = {
        name = {
          type     = "text"
          analyzer = "my_analyzer"
          fields   = { keyword = { type = "keyword" } }
        }
        description   = { type = "text", analyzer = "my_analyzer" }
        restaurant_id = { type = "keyword" }
      }
    }
  }
}
