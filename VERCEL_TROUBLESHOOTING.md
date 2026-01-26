# Vercel "No Next.js Detected" - Troubleshooting Guide

## ✅ What I Just Fixed

1. **Simplified vercel.json** - Removed framework override that might interfere with auto-detection
2. **Pushed to main** - Latest changes are on GitHub

## 🔍 Check These Vercel Settings

Go to your Vercel project → **Settings** → **General**

### 1. Root Directory
- **Must be empty** or set to `./`
- **NOT** set to a subdirectory
- This tells Vercel where to find `package.json`

### 2. Framework Preset
- Should be **Next.js** (auto-detected)
- If it says "Other", change it to "Next.js"

### 3. Build & Development Settings

Go to **Settings** → **Build & Development Settings**:

- **Framework Preset**: `Next.js`
- **Build Command**: Leave empty (auto: `next build`) OR set to `npm run build`
- **Output Directory**: Leave empty (auto: `.next`) OR set to `.next`
- **Install Command**: `npm install --legacy-peer-deps`
- **Node.js Version**: `18.x` or `20.x` (recommended)

## 🔄 After Updating Settings

1. **Save** all settings
2. Go to **Deployments** tab
3. Click **Redeploy** on the latest deployment
4. Or push a new commit to trigger auto-deploy

## ✅ Verify package.json is on GitHub

Check: https://github.com/stevedesignerdsmb/portfolio/blob/main/package.json

You should see:
```json
"dependencies": {
  "next": "^15.0.0",
  ...
}
```

## 🐛 Common Issues

### Issue 1: Root Directory is Wrong
**Symptom**: Vercel can't find package.json
**Fix**: Set Root Directory to `./` (empty) in Vercel settings

### Issue 2: Framework Not Detected
**Symptom**: Shows "Other" instead of "Next.js"
**Fix**: Manually set Framework Preset to "Next.js"

### Issue 3: Install Command Failing
**Symptom**: Build fails during install
**Fix**: Set Install Command to `npm install --legacy-peer-deps`

## 📝 Step-by-Step Fix

1. **Vercel Dashboard** → Your Project → **Settings**
2. **General** tab:
   - Root Directory: `./` (or leave empty)
3. **Build & Development Settings**:
   - Framework Preset: `Next.js`
   - Install Command: `npm install --legacy-peer-deps`
   - Build Command: `npm run build` (or leave empty)
   - Output Directory: `.next` (or leave empty)
4. **Save** settings
5. **Deployments** → **Redeploy**

## 🎯 Expected Result

After fixing settings, Vercel should:
- ✅ Detect Next.js 15.0.0
- ✅ Run `npm install --legacy-peer-deps`
- ✅ Run `npm run build`
- ✅ Deploy successfully

## Still Not Working?

If it still doesn't work:
1. Check the deployment logs in Vercel
2. Verify package.json is in the root on GitHub
3. Try deleting and re-importing the project in Vercel
4. Make sure you're connected to the correct repo: `stevedesignerdsmb/portfolio`
