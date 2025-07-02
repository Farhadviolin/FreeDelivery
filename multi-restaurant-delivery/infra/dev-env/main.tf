resource "kubernetes_namespace" "dev" {
  metadata {
    name = "dev-${var.pr_number}"
  }
}
# Weitere Ressourcen wie Ingress, DB-Instance etc. können hier modular ergänzt werden.
