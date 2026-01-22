# Push Staging Branch to GitHub

## Quick Push Command

Run this to push your staging branch:

```bash
git push -u origin staging
```

## If You Get Certificate Errors

Try one of these:

### Option 1: Disable SSL verification (temporary)
```bash
git config --global http.sslVerify false
git push -u origin staging
```

### Option 2: Use SSH (if configured)
```bash
git remote set-url origin git@github.com:stevedesignerdsmb/portfolio.git
git push -u origin staging
```

### Option 3: Update certificates
```bash
# On macOS
brew install ca-certificates
```

## After Pushing

1. Go to https://vercel.com
2. Import your repository
3. Vercel will auto-detect the staging branch
4. Add environment variables (see STAGING_SETUP.md)
5. Deploy!

## Current Branch Status

You're on: `staging` branch
Ready to push: ✅
Commits ready: 2 commits
