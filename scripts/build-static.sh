#!/bin/bash
set -e
cd app
npm run build
cd ..
rm -rf hub-server/static
cp -r app/dist hub-server/static
echo "Frontend copied to hub-server/static"
