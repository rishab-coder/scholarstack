#!/bin/bash

# ScholarStack - Deployment Script
# This script helps commit and deploy to GitHub and Vercel

echo "🚀 ScholarStack Deployment Script"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Staging files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "feat: Implement full ScholarStack functionality

- Add Digital Locker with visual trophy room
- Implement Profile Strength Meter with real-time analysis
- Add Gap Finder with smart suggestions
- Create Scholarship Matcher based on achievements
- Add Export Tools (Brag Sheet, Common App, JSON)
- Add localStorage persistence
- Convert to vanilla JavaScript
- Add responsive design and dark mode support
- Configure Vercel deployment"
fi

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "🌐 Remote repository found"
    echo "📤 Pushing to GitHub..."
    git push -u origin main || git push -u origin master
else
    echo "⚠️  No remote repository configured"
    echo ""
    echo "To set up GitHub:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "3. Run: git branch -M main"
    echo "4. Run: git push -u origin main"
fi

echo ""
echo "✅ Git operations complete!"
echo ""
echo "📦 To deploy to Vercel:"
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Run: vercel"
echo "3. Follow the prompts to deploy"
echo ""
echo "Or connect your GitHub repo to Vercel at: https://vercel.com/new"

