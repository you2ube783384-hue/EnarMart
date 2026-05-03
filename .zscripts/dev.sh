#!/bin/bash
cd /home/z/my-project

# Install dependencies
bun install

# Generate Prisma client (don't push - we use Turso)
bun run db:generate

# Start server with auto-restart
while true; do
  echo "Starting Next.js dev server..."
  npx next dev -p 3000
  echo "Server exited at $(date). Restarting in 2 seconds..."
  sleep 2
done
