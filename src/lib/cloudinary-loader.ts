export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If src starts with /, it's a local image - return as-is
  if (src.startsWith('/')) {
    return src;
  }
  
  // Otherwise, use Cloudinary
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set');
  }
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${src}`;
}
