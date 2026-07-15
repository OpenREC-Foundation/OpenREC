#!/usr/bin/env bash
set -euo pipefail

VERSION=${1:-}
if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    exit 1
fi

echo "📦 Preparing release v$VERSION..."

# Update version in Cargo.toml files
cd engine
for crate in core recorder editor ai plugins packs export; do
    if [ -f "$crate/Cargo.toml" ]; then
        sed -i "s/^version = \"[0-9.]*\"/version = \"$VERSION\"/" "$crate/Cargo.toml"
    fi
done
sed -i "s/^version = \"[0-9.]*\"/version = \"$VERSION\"/" Cargo.toml
cd ..

# Update version in package.json
cd app
sed -i "s/\"version\": \"[0-9.]*\"/\"version\": \"$VERSION\"/" package.json
cd ..

# Commit and tag
git add engine/**/Cargo.toml engine/Cargo.toml app/package.json
git commit -m "chore: bump version to $VERSION"
git tag "v$VERSION"
git push origin main --tags

echo "✅ Release v$VERSION prepared and pushed!"
