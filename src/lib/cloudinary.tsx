'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';

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

export function CldImage({ src, alt, width, height, className, priority }: CloudinaryImageProps): JSX.Element {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set');
  }
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
