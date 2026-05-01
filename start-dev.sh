#!/bin/bash
# Dev server supervisor script
cd /home/z/my-project

# Kill any existing processes
pkill -f "next dev" 2>/dev/null
pkill -f "next-server" 2>/dev/null
sleep 2

# Clear cache
rm -rf .next

# Start the server
exec node node_modules/.bin/next dev -p 3000
