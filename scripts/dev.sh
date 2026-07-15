#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting OpenREC development environment..."

# Start the engine in dev mode (if applicable)
echo "🔧 Starting engine..."
cd engine
cargo watch -x run &
ENGINE_PID=$!
cd ..

# Start the frontend dev server
echo "🎨 Starting frontend dev server..."
cd app
npm run dev &
FRONTEND_PID=$!
cd ..

# Trap to kill both processes on exit
trap "kill $ENGINE_PID $FRONTEND_PID 2>/dev/null" EXIT

echo "OpenREC is running!"
echo "Frontend: http://localhost:5173"
wait
