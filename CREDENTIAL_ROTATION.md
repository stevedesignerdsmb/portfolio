# ⚠️ URGENT: Rotate Your Cloudinary Credentials

## Why This is Critical

Your Cloudinary API credentials were exposed in multiple files that were committed to GitHub. Even though we've removed them from the current code, they still exist in the git history.

## Immediate Actions Required

### 1. Rotate Cloudinary Credentials (DO THIS NOW)

1. Go to https://console.cloudinary.com/
2. Navigate to **Settings** → **Security**
3. Click **Regenerate** for:
   - API Key
   - API Secret
4. Save the new credentials securely

### 2. Update Environment Variables

#### Local Development
Update your `.env.local` file with the new credentials:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_new_cloud_name
CLOUDINARY_API_KEY=your_new_api_key
CLOUDINARY_API_SECRET=your_new_api_secret
CLOUDINARY_URL=cloudinary://your_new_api_key:your_new_api_secret@your_new_cloud_name
```

#### Vercel
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Update all four variables with new credentials:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `CLOUDINARY_URL`
3. Make sure to update for **Production**, **Preview**, and **Development** environments
4. **Redeploy** after updating

### 3. Clean Git History (Optional but Recommended)

The old credentials are still in git history. To completely remove them:

**Option A: Use git-secrets (Recommended)**
```bash
# Install git-secrets
brew install git-secrets  # macOS
# or
git clone https://github.com/awslabs/git-secrets.git

# Add patterns to prevent future commits
git secrets --register-aws
git secrets --add 'CLOUDINARY.*=.*[0-9a-zA-Z]{20,}'
```

**Option B: Use BFG Repo-Cleaner**
```bash
# Download BFG
# https://rtyley.github.io/bfg-repo-cleaner/

# Remove credentials from history
java -jar bfg.jar --replace-text credentials.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Option C: Accept Risk**
If the repository is private and you're comfortable with the risk, you can leave it as-is. The credentials are removed from current files.

## What Was Fixed

✅ Removed credentials from 8 files:
- `ENV_SETUP.md`
- `SETUP_INSTRUCTIONS.md`
- `QUICK_START.md`
- `DEPLOYMENT_READY.md`
- `STAGING_SETUP.md`
- `VERCEL_DEPLOY.md`
- `install.sh`
- `src/lib/cloudinary-loader.ts`

✅ All files now use placeholders
✅ Code now fails gracefully if env vars are missing

## Prevention

To prevent this in the future:
1. Never commit `.env.local` or any file with real credentials
2. Use `.env.example` files with placeholders
3. Add pre-commit hooks to check for secrets
4. Use tools like `git-secrets` or `truffleHog`

## Status

- ✅ Credentials removed from all current files
- ⚠️ Credentials still in git history (rotate them!)
- ✅ Code updated to use environment variables only
