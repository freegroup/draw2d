#!/usr/bin/env bash

set -e  # Exit on error

# ============================================
# Version Bump Function
# ============================================
bump_version() {
    # Get current version using npm
    CURRENT_VERSION=$(npm pkg get version | tr -d '"')
    
    echo ""
    echo "Current version: $CURRENT_VERSION"
    echo ""
    echo "Version bump options:"
    echo "  [p]atch  - Bug fixes (backward compatible)"
    echo "  [m]inor  - New features (backward compatible)"
    echo "  [M]ajor  - Breaking changes"
    echo "  [Enter]  - No version change"
    echo ""
    read -p "Select version bump [p/m/M/Enter]: " BUMP_TYPE
    
    case "$BUMP_TYPE" in
        p|P|patch)
            npm version patch --no-git-tag-version
            ;;
        m|minor)
            npm version minor --no-git-tag-version
            ;;
        M|major)
            npm version major --no-git-tag-version
            ;;
        "")
            echo "No version change."
            return
            ;;
        *)
            echo "Invalid option. No version change."
            return
            ;;
    esac
    
    NEW_VERSION=$(npm pkg get version | tr -d '"')
    echo "✓ Version updated: $CURRENT_VERSION → $NEW_VERSION"
}

# ============================================
# Main Build Process
# ============================================
echo "=== Building draw2d.js ==="

# Ask for version bump
bump_version

# Build the main library first
echo ""
echo "1/4 Building main library..."
npm install
npm run build

# Replace @VERSION@ placeholder in dist with actual version
VERSION=$(npm pkg get version | tr -d '"')
echo "Replacing @VERSION@ with $VERSION in dist/draw2d.js..."
sed -i '' "s/@VERSION@/$VERSION/g" ./dist/draw2d.js

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

# Show final version
echo ""
echo "=== Build complete! ==="
echo "Version: $(npm pkg get version | tr -d '"')"
