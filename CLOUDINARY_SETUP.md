# Cloudinary Image Upload Guide

## Folder Structure

All images should be uploaded to the `portfolio/` folder in your Cloudinary account.

## Required Images

### Profile & Hero Section
- `portfolio/steve-profile` - Profile picture (180x180px recommended, will be cropped to circle)

### Projects
- `portfolio/fina-ai-dashboard` - Main project image for Fina AI
- `portfolio/fina-ai-mobile` - Additional image for Fina AI
- `portfolio/smb-co-dashboard` - Main project image for SMB.co
- `portfolio/smb-co-tasks` - Additional image for SMB.co
- `portfolio/mercadolibre-dashboard` - Main project image for MercadoLibre

### Experience Icons
- `portfolio/fina-ai-icon` - Icon for Fina AI (40x40px recommended)
- `portfolio/smb-co-icon` - Icon for SMB.co (40x40px recommended)
- `portfolio/mercadolibre-icon` - Icon for MercadoLibre (40x40px recommended)

### Visuals Gallery
- `portfolio/visual-1` through `portfolio/visual-6` - Visual gallery images

### Testimonials
- `portfolio/testimonial-avatar` - Testimonial author avatar (18x18px, will be cropped to circle)

### Toolbox Icons
- `portfolio/figma-icon` - Figma icon (32x32px)
- `portfolio/react-icon` - React icon (32x32px)
- `portfolio/supabase-icon` - Supabase icon (32x32px)
- `portfolio/weweb-icon` - WeWeb icon (32x32px)
- `portfolio/nextjs-icon` - Next.js icon (32x32px)

### Selected Work Section
- `portfolio/visuals-gallery` - Main visuals gallery image (1048x654px)

## Upload Instructions

1. Go to your Cloudinary dashboard: https://console.cloudinary.com/
2. Navigate to Media Library
3. Create a folder named `portfolio` (if it doesn't exist)
4. Upload all images to the `portfolio/` folder
5. Use the exact filenames listed above (without extension - Cloudinary handles that)
6. After uploading, the public ID will be `portfolio/filename`

## Image Optimization

Cloudinary automatically optimizes images. The `CldImage` component will:
- Serve optimized formats (WebP, AVIF when supported)
- Resize images based on the `width` and `height` props
- Lazy load images below the fold
- Use responsive images

## Verification

After uploading images, verify they're accessible:
- Check that public IDs match exactly (case-sensitive)
- Test image URLs: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/portfolio/image-name`
- Images should load in the development server

## Notes

- Image extensions are optional in Cloudinary public IDs
- You can upload JPG, PNG, or other formats - Cloudinary will serve optimized versions
- Keep original high-resolution images - Cloudinary handles all transformations
- All images are referenced by public ID in the JSON data files
