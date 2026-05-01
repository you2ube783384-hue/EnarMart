#!/bin/bash
cd /home/z/my-project

# Install dependencies
bun install

# Push database
bun run db:push

# Start server with auto-restart
while true; do
  echo "Starting Next.js dev server..."
  npx next dev -p 3000
  echo "Server exited at $(date). Restarting in 2 seconds..."
  sleep 2
done
