#!/bin/bash

# ScholarStack - Commit and Deploy Script
# Run this script to commit changes and prepare for deployment

set -e

echo "🎯 ScholarStack - Commit & Deploy"
echo "================================"
echo ""

# Fix Xcode tools if needed (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if ! xcode-select -p &> /dev/null; then
        echo "⚠️  Xcode Command Line Tools not found"
        echo "Run: xcode-select --install"
        exit 1
    fi
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
fi

# Add all files
echo "📝 Staging files..."
git add .

# Show what will be committed
echo ""
echo "📋 Files to be committed:"
git status --short
echo ""

# Commit
read -p "💾 Create commit? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git commit -m "feat: Implement full ScholarStack functionality

✨ Features:
- Digital Locker with visual trophy room
- Profile Strength Meter with real-time analysis
- Gap Finder with smart suggestions
- Scholarship Matcher based on achievements
- Export Tools (Brag Sheet, Common App, JSON)
- localStorage persistence
- Responsive design and dark mode support

🔧 Technical:
- Converted to vanilla JavaScript
- Configured Vercel deployment
- Added comprehensive documentation"
    
    echo "✅ Changes committed!"
    echo ""
    
    # Check for remote
    if git remote get-url origin &> /dev/null; then
        echo "🌐 Remote repository found"
        read -p "📤 Push to GitHub? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git push -u origin main 2>/dev/null || git push -u origin master
            echo "✅ Pushed to GitHub!"
        fi
    else
        echo "⚠️  No remote repository configured"
        echo ""
        echo "To connect to GitHub:"
        echo "1. Create a repo at https://github.com/new"
        echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
        echo "3. Run: git branch -M main"
        echo "4. Run: git push -u origin main"
    fi
    
    echo ""
    echo "🚀 To deploy to Vercel:"
    echo "1. Go to https://vercel.com/new"
    echo "2. Import your GitHub repository"
    echo "3. Vercel will auto-detect settings from vercel.json"
    echo "4. Click 'Deploy'"
    echo ""
    echo "Or use CLI: npm i -g vercel && vercel"
else
    echo "❌ Commit cancelled"
fi

