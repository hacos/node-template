resource "helm_release" "main" {
  namespace  = var.prefix
  name       = "${var.prefix}-${local.environment}"
  repository = data.helm_repository.stable.metadata[0].name
  chart      = "chaoskube"

  set {
    name  = "interval"
    value = local.environment == "production" ? "10m" : "2m"
  }

  set {
    name  = "namespaces"
    value = var.prefix
  }

  # By default chaoskube runs in dry-run mode so it doesn't actually kill anything
  set {
    name  = "dryRun"
    value = "false"
  }
}
