# Create GitHub Repository - Quick Guide

## Method 1: Using GitHub Website (Easiest)

1. **Go to GitHub**: https://github.com/new

2. **Fill in the form**:
   - **Repository name**: `ScholarStack`
   - **Description**: `Achievement tracking and scholarship matching platform`
   - **Visibility**: Choose Public or Private
   - **⚠️ IMPORTANT**: Do NOT check "Add a README file" (we already have one)
   - **⚠️ IMPORTANT**: Do NOT check "Add .gitignore" (we already have one)
   - **⚠️ IMPORTANT**: Do NOT check "Choose a license"

3. **Click "Create repository"**

4. **After creating**, run this script:
   ```bash
   cd /Users/rishab/Desktop/ScholarStack
   ./create-github-repo.sh
   ```

## Method 2: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Login to GitHub
gh auth login

# Create repository
gh repo create ScholarStack --public --description "Achievement tracking and scholarship matching platform"

# Add remote and push
cd /Users/rishab/Desktop/ScholarStack
git remote add origin https://github.com/YOUR_USERNAME/ScholarStack.git
git push -u origin main
```

## Method 3: Manual Commands

After creating the repo on GitHub website:

```bash
cd /Users/rishab/Desktop/ScholarStack

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ScholarStack.git

# Push to GitHub
git push -u origin main
```

## What Happens Next?

After pushing, your code will be on GitHub at:
`https://github.com/YOUR_USERNAME/ScholarStack`

Then you can deploy to Vercel at: https://vercel.com/new

