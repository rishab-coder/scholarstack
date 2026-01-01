#!/bin/bash

# Quick push script - Add your GitHub details and run

echo "🚀 Push ScholarStack to GitHub"
echo "=============================="
echo ""

# Get GitHub details
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: ScholarStack): " REPO_NAME
REPO_NAME=${REPO_NAME:-ScholarStack}

echo ""
echo "🔗 Adding remote repository..."
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git" 2>/dev/null || \
    git remote set-url origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "✅ Remote configured: $(git remote get-url origin)"
echo ""

# Ensure we're on main branch
git branch -M main 2>/dev/null || true

echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed!"
echo "🌐 Repository: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"

