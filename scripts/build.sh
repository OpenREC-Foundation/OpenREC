#!/bin/bash
set -e
cd engine && cargo build --release
cd ../app && npm ci && npm run build
echo "Build completo!"
