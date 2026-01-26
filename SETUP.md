# Setup Guide

## Initial Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AlignUI

AlignUI needs to be configured after installation:

```bash
npx @alignui/cli tailwind
```

This will:
- Configure Tailwind CSS with AlignUI design tokens
- Update `tailwind.config.ts`
- Update `globals.css` with AlignUI theme

**Important**: Commit your changes before running this command, or make sure everything is backed up, as it will modify configuration files.

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Cloudinary credentials:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Upload Images to Cloudinary

1. Go to your Cloudinary dashboard
2. Create a folder called `portfolio` (or use your preferred folder name)
3. Upload all images you'll use in the portfolio
4. Note the public IDs (e.g., `portfolio/image-name`)
5. Update the JSON data files with these public IDs

### 5. Update Content

Edit the JSON files in `src/data/`:
- `projects.json` - Your project portfolio
- `experience.json` - Work experience
- `visuals.json` - Visual gallery items

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Vercel Deployment

### First Time Setup

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY` (optional)
   - `CLOUDINARY_API_SECRET` (optional)
5. Deploy

### Preview Deployments

Vercel automatically creates preview deployments for:
- Every pull request
- Every branch push

Each preview gets a unique URL like: `your-project-git-branch.vercel.app`

## Troubleshooting

### Images Not Loading

- Check that `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set correctly
- Verify image public IDs in JSON files match Cloudinary
- Ensure images are uploaded to Cloudinary (not just referenced)

### AlignUI Not Working

- Make sure you've run `npx @alignui/cli tailwind`
- Check that `tailwind.config.ts` was updated
- Verify `globals.css` includes AlignUI imports

### TypeScript Errors

- Run `npm run build` to see all TypeScript errors
- Ensure all imports use the `@/` alias
- Check that types are defined in `src/types/index.ts`

## Next Steps

1. Customize content in JSON files
2. Upload your images to Cloudinary
3. Run AlignUI CLI to configure design tokens
4. Test locally with `npm run dev`
5. Deploy to Vercel
