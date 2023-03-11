#!/usr/bin/env bash

# This tags and uploads an image to Docker Hub

# Step 1:
# This is your Docker ID/path
# dockerpath=<>
dockerpath="eben12ysh/app"

# Step 2
# Run the Docker Hub container with kubernetes
kubectl run appProd \
    --image=${dockerpath}:v1.0.0\
    --port=80 --labels app=appProd
    
# Step 3:
# List kubernetes pods
kubectl get pods

# Step 4:
# Forward the container port to a host
kubectl port-forward pods/appdemo 4000:80