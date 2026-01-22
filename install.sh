#!/bin/bash

# Portfolio Installation Script
# This script will install all dependencies and set up the project

echo "🚀 Starting portfolio setup..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ npm install failed. Trying with clean install..."
    rm -rf node_modules package-lock.json
    npm cache clean --force
    npm install --legacy-peer-deps
fi

# Step 2: Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dfwi6dpkz
CLOUDINARY_API_KEY=697827227464647
CLOUDINARY_API_SECRET=mNq66NSrKZOYKnVQ6O975lH8Fzg
CLOUDINARY_URL=cloudinary://697827227464647:mNq66NSrKZOYKnVQ6O975lH8Fzg@dfwi6dpkz
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Run: npx @alignui/cli tailwind"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
