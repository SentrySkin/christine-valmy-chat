#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Create clean plugin directory
echo "Creating clean plugin export..."
rm -rf christine-valmy-test-export
mkdir christine-valmy-test-export

# Copy only necessary files
cp -r build/ christine-valmy-test-export/
cp -r public/ christine-valmy-test-export/
cp -r src/ christine-valmy-test-export/
cp christine-valmy-test.php christine-valmy-test-export/
cp package.json christine-valmy-test-export/
cp README.md christine-valmy-test-export/

# Remove development files from export
cd christine-valmy-test-export
rm -rf node_modules/
rm -rf .git/
rm -f .gitignore
rm -f build-plugin.sh

# Create zip file
echo "Creating zip file..."
zip -r ../christine-valmy-test.zip .

echo "Plugin export created: christine-valmy-test.zip"
echo "Size: $(du -sh ../christine-valmy-test.zip | cut -f1)"
