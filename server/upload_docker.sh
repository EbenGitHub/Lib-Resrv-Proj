#!/usr/bin/env bash
# This file tags and uploads an image to Docker Hub

# Assumes that an image is built via `run_docker.sh`

# Step 1:
# Create dockerpath
# dockerpath=<your docker ID/path>
dockerpath="eben12ysh/app"

# Step 2:  
# Authenticate & tag
echo "Docker ID and Image: $dockerpath"

# Tag the application with version name
docker tag app ${dockerpath}:v1.0.0

# Login to docker account
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

# Step 3:
# Push image to a docker repository
docker push ${dockerpath}:v1.0.0