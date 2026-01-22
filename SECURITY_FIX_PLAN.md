# Security & Deployment Fix Plan

## Critical Issues Identified

### Issue 1: Exposed Cloudinary Credentials ⚠️ SECURITY RISK
**Found in 8 files committed to GitHub:**
- `ENV_SETUP.md`
- `SETUP_INSTRUCTIONS.md`
- `QUICK_START.md`
- `DEPLOYMENT_READY.md`
- `STAGING_SETUP.md`
- `VERCEL_DEPLOY.md`
- `install.sh`
- `src/lib/cloudinary-loader.ts` (hardcoded fallback)

### Issue 2: Vercel Deployment Error
**Error**: "No Next.js version detected"
**Possible causes:**
- Root Directory setting in Vercel
- package.json not being found
- Build configuration issue

## Fix Plan

### Phase 1: Remove Exposed Credentials (URGENT)

1. **Remove credentials from all documentation files**
   - Replace with placeholders: `your_cloud_name`, `your_api_key`, etc.
   - Files to fix:
     - `ENV_SETUP.md`
     - `SETUP_INSTRUCTIONS.md`
     - `QUICK_START.md`
     - `DEPLOYMENT_READY.md`
     - `STAGING_SETUP.md`
     - `VERCEL_DEPLOY.md`
     - `install.sh`

2. **Fix hardcoded fallback in code**
   - `src/lib/cloudinary-loader.ts` - Remove hardcoded cloud name
   - Should fail gracefully if env var not set

3. **Verify .gitignore**
   - Ensure `.env.local` is properly ignored
   - Add any other sensitive files if needed

4. **Commit and push fixes**
   - Remove credentials from all files
   - Force push if needed (credentials are already exposed, so this is about damage control)

### Phase 2: Fix Vercel Deployment

1. **Verify package.json is on GitHub**
   - Check: https://github.com/stevedesignerdsmb/portfolio/blob/main/package.json
   - Ensure it has `"next": "^15.0.0"` in dependencies

2. **Check Vercel Settings**
   - Root Directory: Must be `./` or empty
   - Framework Preset: Should be `Next.js`
   - Install Command: `npm install --legacy-peer-deps`

3. **Verify vercel.json**
   - Should not override framework detection
   - Keep it minimal

4. **Test deployment**
   - Trigger new deployment
   - Check build logs

### Phase 3: Security Recommendations

1. **Rotate Cloudinary credentials** (IMPORTANT)
   - Go to Cloudinary dashboard
   - Generate new API key and secret
   - Update in Vercel environment variables
   - Update local `.env.local`

2. **Review GitHub repository**
   - Check if credentials are visible in commit history
   - Consider using git-secrets or BFG Repo-Cleaner if needed

3. **Add security checks**
   - Pre-commit hooks to prevent committing secrets
   - CI checks for exposed credentials

## Implementation Steps

### Step 1: Remove Credentials from Files
- Replace all instances of actual credentials with placeholders
- Update all 8 files identified

### Step 2: Fix Code
- Remove hardcoded fallback in `cloudinary-loader.ts`
- Add proper error handling

### Step 3: Commit Changes
- Stage all fixed files
- Commit with message about security fix
- Push to main

### Step 4: Verify Vercel
- Check Vercel settings
- Trigger new deployment
- Verify Next.js is detected

### Step 5: Rotate Credentials
- User should rotate Cloudinary credentials
- Update in Vercel and local env

## Files to Modify

1. `ENV_SETUP.md` - Replace credentials
2. `SETUP_INSTRUCTIONS.md` - Replace credentials
3. `QUICK_START.md` - Replace credentials
4. `DEPLOYMENT_READY.md` - Replace credentials
5. `STAGING_SETUP.md` - Replace credentials
6. `VERCEL_DEPLOY.md` - Replace credentials
7. `install.sh` - Replace credentials
8. `src/lib/cloudinary-loader.ts` - Remove hardcoded fallback

## Expected Outcome

- ✅ No credentials in any committed files
- ✅ All documentation uses placeholders
- ✅ Code fails gracefully if env vars missing
- ✅ Vercel deployment succeeds
- ✅ User rotates credentials for security
