variable "prefix" {
  default = "node-template"
}

variable "region" {
  default = "us-west-2"
}

variable "min_replicas" {
  default = 2
}

variable "max_replicas" {
  default = 5
}

# Maps
variable "workspace_to_environment_map" {
  type = map(string)
  default = {
    staging    = "staging"
    production = "production"
  }
}

variable "workspace_to_root_domain_map" {
  type = map(string)
  default = {
    staging    = "hacphan.com"
    production = "hacphan.com"
  }
}
