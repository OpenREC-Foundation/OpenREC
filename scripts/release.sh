#!/bin/bash
set -e
VERSION=$1
sed -i "s/^version = \"[0-9.]*\"/version = \"$VERSION\"/" engine/Cargo.toml
sed -i "s/\"version\": \"[0-9.]*\"/\"version\": \"$VERSION\"/" app/package.json
git commit -am "chore: bump to $VERSION"
git tag "v$VERSION"
git push origin main --tags
