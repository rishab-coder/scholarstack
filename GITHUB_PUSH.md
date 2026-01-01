# Push to GitHub - Quick Guide

## Option 1: Run the Script (Easiest)

Open Terminal and run:
```bash
cd /Users/rishab/Desktop/ScholarStack
./push-to-github.sh
```

## Option 2: Manual Commands

If the script doesn't work, run these commands manually:

### Step 1: Fix Xcode Tools (if needed)
```bash
xcode-select --install
```

### Step 2: Initialize Git
```bash
cd /Users/rishab/Desktop/ScholarStack
git init
```

### Step 3: Add and Commit
```bash
git add .
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
```

### Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ScholarStack` (or your choice)
3. Description: "Achievement tracking and scholarship matching platform"
4. Choose Public or Private
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click "Create repository"

### Step 5: Connect and Push

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ScholarStack.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or use SSH: `git remote add origin git@github.com:YOUR_USERNAME/ScholarStack.git`

## Troubleshooting

**xcrun error**: Run `xcode-select --install` and restart terminal

**Authentication error**: 
- Use GitHub CLI: `gh auth login`
- Or create a Personal Access Token at https://github.com/settings/tokens

**Remote already exists**: 
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/ScholarStack.git
```

## After Pushing

Your code will be on GitHub! Next step: Deploy to Vercel at https://vercel.com/new

