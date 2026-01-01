#!/bin/bash

# Create GitHub Repository for ScholarStack
# This script will guide you through creating a repo and connecting it

set -e

echo "🚀 Create GitHub Repository for ScholarStack"
echo "=============================================="
echo ""

# Check if already has remote
if git remote get-url origin &> /dev/null; then
    echo "⚠️  Remote already configured:"
    git remote -v
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

echo "📝 To create a GitHub repository:"
echo ""
echo "Option 1: Using GitHub Website (Recommended)"
echo "--------------------------------------------"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: ScholarStack"
echo "3. Description: Achievement tracking and scholarship matching platform"
echo "4. Choose: Public or Private"
echo "5. ⚠️  DO NOT check 'Initialize with README' (we already have files)"
echo "6. Click 'Create repository'"
echo ""
echo "Option 2: Using GitHub CLI (if installed)"
echo "------------------------------------------"
echo "Run: gh repo create ScholarStack --public --description 'Achievement tracking and scholarship matching platform'"
echo ""

read -p "Have you created the repository? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please create the repository first, then run this script again."
    exit 1
fi

echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: ScholarStack): " REPO_NAME
REPO_NAME=${REPO_NAME:-ScholarStack}

echo ""
echo "🔗 Adding remote repository..."
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git" 2>/dev/null || \
    git remote set-url origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "✅ Remote added: $(git remote get-url origin)"
echo ""

# Ensure we're on main branch
git branch -M main 2>/dev/null || true

echo "📤 Pushing to GitHub..."
echo ""
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "🌐 Your repository is now live at:"
echo "   https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "🚀 Next step: Deploy to Vercel at https://vercel.com/new"

