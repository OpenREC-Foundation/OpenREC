#!/bin/bash
set -e
cd engine && cargo watch -x run &
cd app && npm run dev &
wait
