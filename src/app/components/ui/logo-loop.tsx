'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';

interface LogoLoopProps {
  logos: Array<{ name: string; image: string }>;
  className?: string;
}

export function LogoLoop({ logos, className = '' }: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [logoWidth, setLogoWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (firstSetRef.current) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          if (firstSetRef.current) {
            const width = firstSetRef.current.offsetWidth;
            if (width > 0) {
              setLogoWidth(width);
            }
          }
        });
      }
    };

    // Initial measurement with delay to ensure DOM is ready
    const initialTimeout = setTimeout(updateWidth, 100);

    // Wait for images to load
    const images = containerRef.current?.querySelectorAll('img');
    let checkComplete: (() => void) | null = null;
    
    if (images && images.length > 0) {
      let loadedCount = 0;
      const totalImages = images.length;
      
      checkComplete = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          // Give extra time for layout to settle
          setTimeout(updateWidth, 200);
        }
      };

      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          checkComplete?.();
        } else if (checkComplete) {
          img.addEventListener('load', checkComplete, { once: true });
          img.addEventListener('error', checkComplete, { once: true });
        }
      });
    } else {
      // If no images found, try again after a delay
      setTimeout(updateWidth, 300);
    }

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateWidth, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      if (images && checkComplete) {
        images.forEach((img) => {
          img.removeEventListener('load', checkComplete);
          img.removeEventListener('error', checkComplete);
        });
      }
    };
  }, [logos]);

  useEffect(() => {
    if (logoWidth > 0) {
      // Reset position to 0 before starting animation
      x.set(0);
      
      const controls = animate(x, -logoWidth, {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      });
      
      return () => {
        controls.stop();
      };
    }
  }, [logoWidth, x]);

  return (
    <div className={`overflow-hidden relative ${className}`} ref={containerRef}>
      {/* Left gradient mask - soft fade only, no blur */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
        }}
      />
      {/* Right gradient mask - soft fade only, no blur */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
        }}
      />
      <motion.div
        className="flex gap-2.5 items-center"
        style={{ x }}
      >
        <div className="flex gap-2.5 items-center" ref={firstSetRef}>
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-first-${index}`}
              className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2.5 items-center">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-second-${index}`}
              className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
