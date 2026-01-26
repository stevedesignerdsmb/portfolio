# Installation Fix Guide

## The Problem

The `next-cloudinary` package version 5.20.0 doesn't officially support Next.js 15, causing a peer dependency conflict.

## The Solution

I've updated the code to use Next.js's built-in `Image` component with a custom Cloudinary loader instead. This:
- ✅ Works with Next.js 15
- ✅ Provides the same image optimization
- ✅ No dependency conflicts
- ✅ Simpler setup

## Installation Steps

### Option 1: Use --legacy-peer-deps (Recommended)

```bash
npm install --legacy-peer-deps
```

This will install all dependencies while ignoring the peer dependency conflict.

### Option 2: Remove next-cloudinary dependency

The code has been updated to not require `next-cloudinary`. You can remove it from package.json if Option 1 doesn't work:

```bash
# Edit package.json and remove the next-cloudinary line, then:
npm install
```

## What Changed

1. **`src/lib/cloudinary.ts`** - Now uses Next.js `Image` component with Cloudinary URLs
2. **`next.config.ts`** - Added custom loader for Cloudinary
3. **`src/lib/cloudinary-loader.ts`** - New custom loader for optimized images

## After Installation

1. Run: `npm install --legacy-peer-deps`
2. Create `.env.local` with your Cloudinary credentials
3. Run: `npx @alignui/cli tailwind`
4. Run: `npm run dev`

The images will work exactly the same way, just using Next.js Image instead of CldImage.
