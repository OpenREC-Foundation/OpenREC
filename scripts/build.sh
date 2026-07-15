#!/usr/bin/env bash
set -euo pipefail

echo "🔨 Building OpenREC..."

# Build the Rust engine
echo "📦 Building engine (Rust)..."
cd engine
cargo build --release
cd ..

# Build the frontend
echo "📦 Building frontend (React)..."
cd app
npm ci
npm run build
cd ..

# For Tauri desktop build
if [ "$BUILD_DESKTOP" = "true" ]; then
    echo "🖥️  Building desktop application..."
    cd app
    npm run tauri build
    cd ..
fi

echo "✅ Build completed successfully!"
