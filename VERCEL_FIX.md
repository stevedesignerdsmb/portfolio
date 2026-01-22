# Vercel Deployment Fix - Step by Step

## The Problem

Vercel error: "No Next.js version detected"

## Root Cause Analysis

The `package.json` is correct and on GitHub, but Vercel might be:
1. Looking in the wrong directory (Root Directory setting)
2. Not detecting the framework automatically
3. Having issues with the install command

## Solution Steps

### Step 1: Verify package.json on GitHub

Check: https://github.com/stevedesignerdsmb/portfolio/blob/main/package.json

You should see:
```json
{
  "dependencies": {
    "next": "^15.0.0",
    ...
  }
}
```

If it's there, proceed to Step 2.

### Step 2: Fix Vercel Settings

Go to **Vercel Dashboard** → Your Project → **Settings**

#### A. General Settings

1. **Root Directory**: 
   - Must be **EMPTY** or set to `./`
   - If it's set to anything else (like `src/` or `app/`), clear it
   - This is the #1 cause of this error

2. **Project Name**: (leave as is)

#### B. Build & Development Settings

1. **Framework Preset**: 
   - Change to **Next.js** (don't leave as "Other")
   - Even if it says "Auto-detected", manually set it

2. **Build Command**: 
   - Leave **EMPTY** (Vercel will use `next build`)
   - OR set to: `npm run build`

3. **Output Directory**: 
   - Leave **EMPTY** (Vercel will use `.next`)
   - OR set to: `.next`

4. **Install Command**: 
   - Set to: `npm install --legacy-peer-deps`
   - This is important for your dependency setup

5. **Node.js Version**: 
   - Set to `20.x` (recommended) or `18.x`

### Step 3: Save and Redeploy

1. Click **Save** on all settings
2. Go to **Deployments** tab
3. Click the **⋯** menu on the latest deployment
4. Click **Redeploy**
5. Watch the build logs

### Step 4: Check Build Logs

In the deployment logs, you should see:
```
✓ Detected Next.js version: 15.0.0
✓ Running "npm install --legacy-peer-deps"
✓ Running "next build"
```

If you still see the error, check:
- Are the logs showing it's looking in the right directory?
- Is `package.json` being found?
- Are there any errors before the Next.js detection?

## Alternative: Delete and Re-import

If the above doesn't work:

1. **Delete the project** in Vercel (Settings → Delete Project)
2. **Re-import** from GitHub:
   - Add New Project
   - Select `stevedesignerdsmb/portfolio`
   - Vercel should auto-detect Next.js
   - Set Install Command: `npm install --legacy-peer-deps`
   - Deploy

## Verification Checklist

After fixing, verify:
- [ ] Root Directory is empty or `./`
- [ ] Framework Preset is set to "Next.js"
- [ ] Install Command is `npm install --legacy-peer-deps`
- [ ] package.json exists on GitHub main branch
- [ ] Build logs show Next.js detection
- [ ] Deployment succeeds

## Expected Build Log Output

```
✓ Detected Next.js version: 15.0.0
✓ Installing dependencies...
✓ Building...
✓ Compiled successfully
✓ Generating static pages
✓ Deployment ready
```
