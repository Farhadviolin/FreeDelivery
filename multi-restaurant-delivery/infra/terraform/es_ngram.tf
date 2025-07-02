resource "elasticsearch_index_template" "autocomplete" {
  name = "autocomplete_template"
  index_patterns = ["menu-items-*"]
  template {
    settings = {
      "index.analysis.analyzer.autocomplete_analyzer.tokenizer" = "autocomplete_tokenizer"
      "index.analysis.tokenizer.autocomplete_tokenizer.type"    = "edge_ngram"
      "index.analysis.tokenizer.autocomplete_tokenizer.min_gram" = 2
      "index.analysis.tokenizer.autocomplete_tokenizer.max_gram" = 20
    }
    mappings = jsonencode({
      properties = {
        name_suggest = {
          type     = "text"
          analyzer = "autocomplete_analyzer"
          search_analyzer = "standard"
        }
      }
    })
  }
}
