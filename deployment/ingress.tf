resource "kubernetes_service" "main" {
  metadata {
    namespace = var.prefix
    name      = "${var.prefix}-service"
  }
  spec {
    selector = {
      app     = var.prefix
      release = local.environment
    }
    port {
      name        = "https"
      protocol    = "TCP"
      port        = "443"
      target_port = random_integer.port.result
    }
  }
}

data "kubernetes_secret" "main" {
  metadata {
    namespace = "default"
    name      = "aks-tls"
  }
}

resource "kubernetes_secret" "main" {
  metadata {
    namespace = var.prefix
    name      = "tls"
  }

  data = data.kubernetes_secret.main.data
  type = data.kubernetes_secret.main.type
}

resource "kubernetes_ingress" "main" {
  metadata {
    namespace = var.prefix
    name      = "${var.prefix}-ingress"
  }

  spec {
    rule {
      host = "${var.prefix}.${local.root_domain}"
      http {
        path {
          backend {
            service_name = "${var.prefix}-service"
            service_port = "443"
          }
        }
      }
    }

    tls {
      hosts       = ["${var.prefix}.${local.root_domain}"]
      secret_name = "tls"
    }
  }
}
