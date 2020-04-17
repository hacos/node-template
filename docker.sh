#!/bin/bash

print_usage() {
  echo "Build, tag, and push Docker image to ECR"
  echo "Usage: $0 [-e environment] -n name"
  echo " "
  echo "Options:"
  echo "-h       show this help"
  echo "-e       environment: staging or production"
  echo "-n       name of the image"
}

# Defaults
env="staging"
name='node-template' # Can also be subfolders like example/aks-docker-example
date_tag=`date +%Y-%m-%d-%H-%M` # YYYY-MM-DD-HH-MM

echo '[DEBUG] Parsing flags'
while getopts 'he:n:' flag; do
  case "${flag}" in
    h)
      print_usage
      exit 0
      ;;
    e)
      env=${OPTARG}
      ;;
    n)
      name=${OPTARG}
      ;;
    *)
      error "Unexpected option ${flag}"
      print_usage
      exit 1
      ;;
  esac
done

if [ $env ]; then
  echo "[INFO] Pushing to ${name}"
else
  echo "[ERROR] Environment not provided"
  print_usage
  exit 1
fi

if [ $name ]; then
  echo "[INFO] Pushing to ${name}"
else
  echo "[ERROR] Name not provided"
  print_usage
  exit 1
fi

echo "[INFO] Login"
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 978651561347.dkr.ecr.us-west-2.amazonaws.com/${name}

# Build and Tag
echo "[INFO] Build and Tag"
docker build -t ${name}:latest -t ${name}:${date_tag} .
docker tag ${name}:latest 978651561347.dkr.ecr.us-west-2.amazonaws.com/${name}:latest
docker tag ${name}:${date_tag} 978651561347.dkr.ecr.us-west-2.amazonaws.com/${name}:${date_tag}

# Push
echo "[INFO] Pushing"
docker push 978651561347.dkr.ecr.us-west-2.amazonaws.com/${name}:latest
docker push 978651561347.dkr.ecr.us-west-2.amazonaws.com/${name}:${date_tag}
