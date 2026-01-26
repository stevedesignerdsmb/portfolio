# Environment Variables Setup

## Required: Create `.env.local` file

Since `.env.local` is gitignored for security, you need to create it manually.

### Steps:

1. Create a file named `.env.local` in the root directory
2. Add the following content:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dfwi6dpkz
CLOUDINARY_API_KEY=697827227464647
CLOUDINARY_API_SECRET=mNq66NSrKZOYKnVQ6O975lH8Fzg
CLOUDINARY_URL=cloudinary://697827227464647:mNq66NSrKZOYKnVQ6O975lH8Fzg@dfwi6dpkz
```

### Verification

After creating the file, verify:
- File exists at `/Users/stevecalderon/portfolio/portfolio/.env.local`
- All variables are set correctly
- File is NOT committed to git (it's in `.gitignore`)

### For Vercel Deployment

When deploying to Vercel, add these same environment variables in the Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add each variable for Production, Preview, and Development environments
