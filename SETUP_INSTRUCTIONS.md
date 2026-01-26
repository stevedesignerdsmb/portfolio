# Complete Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Cloudinary account (credentials provided)

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd /Users/stevecalderon/portfolio/portfolio
npm install
```

This will install:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- next-cloudinary
- And all other dependencies

**Note**: If you encounter permission errors, try:
- Using `sudo npm install` (not recommended)
- Or fixing npm permissions: `npm config set prefix ~/.npm-global`

### Step 2: Configure AlignUI

After dependencies are installed, run:

```bash
npx @alignui/cli tailwind
```

Follow the CLI prompts to:
- Choose your color scheme
- Configure design tokens
- Set up spacing and typography

This will automatically update:
- `tailwind.config.ts`
- `src/app/globals.css`

**Important**: The CLI will modify these files. Make sure you've committed your changes or have a backup.

### Step 3: Set Up Environment Variables

Create `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following content (see `ENV_SETUP.md` for details):

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dfwi6dpkz
CLOUDINARY_API_KEY=697827227464647
CLOUDINARY_API_SECRET=mNq66NSrKZOYKnVQ6O975lH8Fzg
CLOUDINARY_URL=cloudinary://697827227464647:mNq66NSrKZOYKnVQ6O975lH8Fzg@dfwi6dpkz
```

Verify the file is in `.gitignore` (it should be automatically).

### Step 4: Upload Images to Cloudinary

1. Go to https://console.cloudinary.com/
2. Navigate to Media Library
3. Create a folder named `portfolio`
4. Upload all required images (see `CLOUDINARY_SETUP.md` for complete list)

Required images:
- Profile picture: `portfolio/steve-profile`
- Project images: `portfolio/fina-ai-dashboard`, `portfolio/smb-co-dashboard`, etc.
- Icons: `portfolio/fina-ai-icon`, `portfolio/smb-co-icon`, etc.
- Visuals: `portfolio/visual-1` through `portfolio/visual-6`
- And more (see `CLOUDINARY_SETUP.md`)

### Step 5: Verify Cloudinary Connection

Test that images can be loaded:

1. Start the development server: `npm run dev`
2. Open http://localhost:3000
3. Check browser console for any Cloudinary errors
4. Verify images load (they may show as broken if not uploaded yet)

### Step 6: Test Development Server

```bash
npm run dev
```

The server should start on http://localhost:3000

Verify:
- ✅ No TypeScript errors
- ✅ No build errors
- ✅ Site loads in browser
- ✅ Components render (images may be missing until uploaded)

### Step 7: Customize Content

Edit the JSON files in `src/data/`:
- `projects.json` - Update with your actual projects
- `experience.json` - Update with your work history
- `visuals.json` - Update with your visual work

## Troubleshooting

### npm install fails

If you get permission errors:
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

Or use a node version manager:
```bash
# Using nvm
nvm install 18
nvm use 18
npm install
```

### AlignUI CLI fails

- Ensure Node.js 18+ is installed: `node --version`
- Try clearing npm cache: `npm cache clean --force`
- Reinstall: `npm install`

### Images not loading

- Verify `.env.local` has correct Cloudinary credentials
- Check that images are uploaded to Cloudinary
- Verify public IDs in JSON files match Cloudinary exactly
- Check browser console for errors

### TypeScript errors

- Run `npm run build` to see all errors
- Ensure all imports use `@/` alias
- Check that types are defined in `src/types/index.ts`

## Next Steps

1. ✅ Dependencies installed
2. ✅ AlignUI configured
3. ✅ Environment variables set
4. ⏳ Upload images to Cloudinary
5. ⏳ Customize content in JSON files
6. ⏳ Test locally
7. ⏳ Deploy to Vercel

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Preview deployments will be created automatically for each branch/PR.
