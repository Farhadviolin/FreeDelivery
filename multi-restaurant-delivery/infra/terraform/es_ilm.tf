resource "elasticsearch_ilm_policy" "menu_policy" {
  name = "menu_ilm"
  policy = jsonencode({
    policy = {
      phases = {
        hot = { actions = { rollover = { max_age = "7d", max_size = "50gb" } } }
        delete = { min_age = "30d", actions = { delete = {} } }
      }
    }
  })
}
