# Deployment Instructions

## Step 1: Fix Xcode Command Line Tools (if needed)

If you see `xcrun: error: invalid active developer path`, run:
```bash
xcode-select --install
```

Or if that doesn't work:
```bash
sudo xcode-select --reset
xcode-select --install
```

## Step 2: Initialize Git and Commit

```bash
cd /Users/rishab/Desktop/ScholarStack

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
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
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `ScholarStack`)
3. **Don't** initialize with README, .gitignore, or license (we already have these)

## Step 4: Connect and Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect the settings from `vercel.json`
4. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/rishab/Desktop/ScholarStack
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? scholarstack (or your choice)
# - Directory? ./
# - Override settings? No
```

### Option C: Quick Deploy Script

You can also use the provided `deploy.sh` script:
```bash
./deploy.sh
```

## Files Created for Deployment

- `.gitignore` - Excludes unnecessary files from git
- `vercel.json` - Vercel deployment configuration
- `README.md` - Project documentation
- `deploy.sh` - Deployment helper script

## Verification

After deployment:
1. Your app will be live at `https://YOUR_PROJECT.vercel.app`
2. All features should work including localStorage persistence
3. The app is a static site, so it works perfectly on Vercel

## Troubleshooting

- **Git errors**: Make sure Xcode Command Line Tools are installed
- **Vercel deployment fails**: Check that `vercel.json` is in the root directory
- **App doesn't load**: Verify all file paths are correct (script.js, style.css)

