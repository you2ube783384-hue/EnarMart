#!/bin/bash
while true; do
  sleep 10
  curl -s http://localhost:3000/ > /dev/null 2>&1 || true
done
