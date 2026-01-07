#!/bin/bash

echo "========================================"
echo "GrantFlow Deployment to Vercel"
echo "========================================"
echo ""
echo "Project Name: GrantFunding"
echo ""

# Check if already logged in
cd /home/z/my-project
echo "Checking Vercel authentication..."
bunx vercel whoami 2>&1

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Not logged in to Vercel"
    echo ""
    echo "Please login with:"
    echo "  bunx vercel login"
    echo ""
    echo "This will open your browser for authentication."
    exit 1
fi

echo ""
echo "✅ Already logged in to Vercel"
echo ""
echo "Deploying to Vercel..."
echo ""

# Deploy with project name
bunx vercel --prod --yes --token=$VERCEL_TOKEN

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "Your app is available at:"
    echo "  https://grantfunding.vercel.app"
    echo ""
else
    echo ""
    echo "❌ Deployment failed"
    echo "Please check the logs above for errors."
    exit 1
fi
