terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "Udelv"

    workspaces {
      prefix = "chaosmonkey-"
    }
  }
}

locals {
  environment = lookup(var.workspace_to_environment_map, terraform.workspace, "")
  root_domain = lookup(var.workspace_to_root_domain_map, terraform.workspace, "dev")
}

data "azurerm_kubernetes_cluster" "main" {
  name                = "aks-${local.environment}"
  resource_group_name = "aks_resources_${local.environment}"
}

data "azurerm_dns_zone" "main" {
  name                = local.root_domain
  resource_group_name = "dns_resources_${local.environment}"
}

resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}_resources_${local.environment}"
  location = data.azurerm_kubernetes_cluster.main.location
}

provider "kubernetes" {
  host = data.azurerm_kubernetes_cluster.main.kube_config[0].host

  # username               = "${data.azurerm_kubernetes_cluster.main.kube_config.0.username}"
  # password               = "${data.azurerm_kubernetes_cluster.main.kube_config.0.password}"
  client_certificate = base64decode(
    data.azurerm_kubernetes_cluster.main.kube_config[0].client_certificate,
  )
  client_key = base64decode(
    data.azurerm_kubernetes_cluster.main.kube_config[0].client_key,
  )
  cluster_ca_certificate = base64decode(
    data.azurerm_kubernetes_cluster.main.kube_config[0].cluster_ca_certificate,
  )
}

provider "helm" {
  kubernetes {
    host = data.azurerm_kubernetes_cluster.main.kube_config[0].host

    # username               = "${data.azurerm_kubernetes_cluster.main.kube_config.0.username}"
    # password               = "${data.azurerm_kubernetes_cluster.main.kube_config.0.password}"
    client_certificate = base64decode(
      data.azurerm_kubernetes_cluster.main.kube_config[0].client_certificate,
    )
    client_key = base64decode(
      data.azurerm_kubernetes_cluster.main.kube_config[0].client_key,
    )
    cluster_ca_certificate = base64decode(
      data.azurerm_kubernetes_cluster.main.kube_config[0].cluster_ca_certificate,
    )
  }
}

data "helm_repository" "stable" {
  name = "stable"
  url  = "https://kubernetes-charts.storage.googleapis.com"
}
