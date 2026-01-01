#!/bin/bash

# GitHub Authentication Helper for ScholarStack

echo "🔐 GitHub Authentication Setup"
echo "==============================="
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    echo ""
    echo "Option 1: Using GitHub CLI (Easiest)"
    echo "-----------------------------------"
    read -p "Authenticate with GitHub CLI? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        gh auth login
        echo ""
        echo "✅ Authenticated with GitHub CLI!"
        echo "You can now push with: git push -u origin main"
        exit 0
    fi
fi

echo ""
echo "Option 2: Personal Access Token"
echo "------------------------------"
echo ""
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token' → 'Generate new token (classic)'"
echo "3. Name: 'ScholarStack Push'"
echo "4. Select scope: 'repo' (full control)"
echo "5. Click 'Generate token'"
echo "6. Copy the token (you won't see it again!)"
echo ""
read -p "Have you created the token? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -sp "Paste your Personal Access Token: " TOKEN
    echo ""
    
    # Store token in git credential helper
    git config --global credential.helper store
    echo "https://rishab-coder:${TOKEN}@github.com" > ~/.git-credentials
    
    echo ""
    echo "✅ Token configured!"
    echo ""
    echo "Now you can push with:"
    echo "  git push -u origin main"
else
    echo ""
    echo "After creating the token, run this script again or:"
    echo "  git push -u origin main"
    echo "  (Use token as password when prompted)"
fi

