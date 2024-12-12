#!/bin/sh

#Stop running container
docker stop $(docker ps -a -q  --filter ancestor=synchrox/backend_orcl_gen)

# Build container
docker build -t synchrox/backend_orcl_gen .

# Run container
docker run -p 5020:5020 -d synchrox/backend_orcl_gen