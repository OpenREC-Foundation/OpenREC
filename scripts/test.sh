#!/usr/bin/env bash
set -euo pipefail

echo "🧪 Running OpenREC tests..."

# Test the Rust engine
echo "📦 Testing engine..."
cd engine
cargo test --workspace
cd ..

# Test the frontend (if tests exist)
echo "📦 Testing frontend..."
cd app
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    npm test
else
    echo "No frontend tests configured."
fi
cd ..

echo "✅ All tests passed!"
