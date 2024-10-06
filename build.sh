#!/bin/bash

if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

docker network create --gateway=$GATEWAY --subnet=$SUBNET app-network

docker compose up -d