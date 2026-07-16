#!/bin/bash
set -e
cd engine && cargo test --workspace
cd ../app && npm test --if-present
