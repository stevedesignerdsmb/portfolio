# Staging Setup Complete! 🚀

## ✅ What's Done

1. ✅ **Staging branch created** - `staging` branch is ready
2. ✅ **All files committed** - 41 files committed locally
3. ✅ **Vercel config created** - `vercel.json` ready for deployment

## 📤 Push to GitHub

You need to push the staging branch to GitHub. Run:

```bash
git push -u origin staging
```

If you get certificate errors, try:

```bash
git config --global http.sslVerify false
git push -u origin staging
```

Or use SSH if you have it set up:

```bash
git remote set-url origin git@github.com:stevedesignerdsmb/portfolio.git
git push -u origin staging
```

## 🔗 Connect to Vercel

### Option 1: Via GitHub (Recommended)

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository: `stevedesignerdsmb/portfolio`
4. Vercel will auto-detect Next.js
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Output Directory**: `.next` (auto-detected)

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy staging
vercel --prod=false
```

## 🔐 Environment Variables in Vercel

After connecting to Vercel, add these environment variables in the dashboard:

**Project Settings → Environment Variables**

Add for **Production**, **Preview**, and **Development**:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

## 🎯 Preview Deployments

Once connected to Vercel:

- **Every push to `staging` branch** → Creates a preview deployment
- **Every pull request** → Creates a preview deployment
- **Push to `main` branch** → Deploys to production

## 📝 Current Status

- ✅ Local staging branch: Ready
- ✅ Files committed: 41 files
- ⏳ Push to GitHub: Need to run `git push -u origin staging`
- ⏳ Vercel connection: Need to connect repository

## 🚀 Quick Commands

```bash
# Push staging branch
git push -u origin staging

# Make changes, then commit and push
git add .
git commit -m "Your changes"
git push

# Vercel will auto-deploy on push!
```

## 📍 Your Staging URL

Once deployed, your staging URL will be:
- Preview: `portfolio-git-staging-yourusername.vercel.app`
- Or custom domain if configured

## 🎉 You're Ready!

1. Push the staging branch: `git push -u origin staging`
2. Connect to Vercel (via dashboard or CLI)
3. Add environment variables in Vercel
4. Start making changes - they'll auto-deploy!
