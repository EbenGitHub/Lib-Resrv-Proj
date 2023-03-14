#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# Build image and add a descriptive tag
docker build --tag=app .

# Step 2: 
# List docker images
docker image ls

# Step 3: 
# Run nodejs app
docker run -p 4000:80 app
