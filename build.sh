#!/usr/bin/env bash

set -e  # Exit on error

echo "=== Building draw2d.js ==="

# Build the main library first
echo "1/4 Building main library..."
npm install
npm run build

# Copy built library to jsdoc public folder and examples
echo "2/4 Copying draw2d.js to jsdoc and examples..."
cp ./dist/draw2d.js ./jsdoc/public/
cp ./dist/draw2d.js ./examples/

# Generate the jsDoc
echo "3/4 Generating JSDoc..."
cd ./jsdoc/
npm install
./node_modules/jsdoc/jsdoc.js -c ./jsdoc.conf

# Generate the VUEjs app
echo "4/4 Building documentation site..."
npm run build

# Deploy to docs folder
cd ..
echo "=== Deploying to docs/ ==="
rm -rf ./docs/
cp -r ./jsdoc/dist/ ./docs

echo "=== Build complete! ==="