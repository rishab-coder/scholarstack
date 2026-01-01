#!/bin/bash

# Push ScholarStack to GitHub
# Run this script in your terminal: ./push-to-github.sh

set -e

echo "🚀 Pushing ScholarStack to GitHub"
echo "=================================="
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
fi

# Add all files
echo "📝 Staging all files..."
git add .

# Check if there are changes
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Creating commit..."
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
fi

# Check for remote
if git remote get-url origin &> /dev/null; then
    REMOTE_URL=$(git remote get-url origin)
    echo "🌐 Remote repository found: $REMOTE_URL"
    echo ""
    
    # Determine branch name
    BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
    if [ "$BRANCH" = "" ]; then
        BRANCH="main"
        git branch -M main 2>/dev/null || true
    fi
    
    echo "📤 Pushing to GitHub (branch: $BRANCH)..."
    git push -u origin $BRANCH || git push -u origin main || git push -u origin master
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your code is now on GitHub!"
    echo "Next step: Deploy to Vercel at https://vercel.com/new"
else
    echo "⚠️  No remote repository configured"
    echo ""
    echo "To connect to GitHub:"
    echo ""
    echo "1. Create a new repository at https://github.com/new"
    echo "   (Don't initialize with README, .gitignore, or license)"
    echo ""
    echo "2. Run these commands:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "Or run this script again after adding the remote."
fi

