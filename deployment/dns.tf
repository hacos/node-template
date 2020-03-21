resource "azurerm_dns_a_record" "main" {
  name                = var.prefix
  zone_name           = data.azurerm_dns_zone.main.name
  resource_group_name = "dns_resources_${local.environment}"
  ttl                 = 3600
  records             = [kubernetes_ingress.main.load_balancer_ingress[0].ip]
}
