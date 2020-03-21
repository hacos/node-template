variable "prefix" {
  default = "chaosmonkey"
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
    staging    = "stage-udelv.com"
    production = "udelv.com"
  }
}
