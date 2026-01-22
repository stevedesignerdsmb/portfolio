'use client';

import Image from 'next/image';

export interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function getCloudinaryUrl(publicId: string, transformations?: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
    return '';
  }
  
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const transformString = transformations ? `/${transformations}` : '';
  return `${baseUrl}${transformString}/${publicId}`;
}

export function CldImage({ src, alt, width, height, className, priority }: CloudinaryImageProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${src}`;
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      unoptimized={false}
    />
  );
}
