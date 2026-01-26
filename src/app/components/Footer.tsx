'use client';

import { useEffect, useRef, useState } from 'react';
import NumberFlow from '@number-flow/react';
import { estimateTokenUsage } from '@/lib/utils/token-calculator';

const DOT_BOX_SHADOW =
  '0 20px 20px -10px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 10px 10px -5px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 6px 6px -3px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 3px 3px -1.5px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 1px 1px -0.5px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 0 0 1px var(--shadow-gray-shadow-8, rgba(23, 23, 23, 0.08)), 0 -1px 1px -0.5px var(--shadow-gray-shadow-6, rgba(23, 23, 23, 0.06)) inset';

// SVG Icon from Figma
const CursorIcon = () => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mx-1"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_32_53)">
      <path
        d="M7.00193 7.99976L13.9369 12.0037C13.8943 12.0775 13.8325 12.1405 13.756 12.1846L7.27404 15.9269C7.10573 16.0241 6.89813 16.0241 6.72982 15.9269L0.24786 12.1846C0.171358 12.1405 0.109557 12.0775 0.0669556 12.0037L7.00193 7.99976Z"
        fill="#72716D"
      />
      <path
        d="M7.00176 -0.000244141V7.99976L0.0667899 12.0037C0.0241889 11.9299 0.000488281 11.8447 0.000488281 11.7564V4.24306C0.000488281 4.06636 0.0946906 3.90345 0.247694 3.81495L6.72936 0.0726577C6.81366 0.0240565 6.90756 -0.000244141 7.00146 -0.000244141H7.00176Z"
        fill="#55544F"
      />
      <path
        d="M13.9366 3.99586C13.894 3.92205 13.8322 3.85905 13.7557 3.81495L7.2737 0.0726577C7.1897 0.0240565 7.09579 -0.000244141 7.00189 -0.000244141V7.99976L13.9369 12.0037C13.9795 11.9299 14.0032 11.8447 14.0032 11.7564V4.24306C14.0032 4.15456 13.9798 4.06996 13.9369 3.99586H13.9366Z"
        fill="#43413C"
      />
      <path
        d="M13.4515 4.27618C13.4908 4.34398 13.4962 4.43098 13.4515 4.50838L7.15644 15.4113C7.11414 15.4851 7.00164 15.4548 7.00164 15.3699V8.18528C7.00164 8.12797 6.98634 8.07277 6.95844 8.02447L13.4512 4.27588H13.4515V4.27618Z"
        fill="#D6D5D2"
      />
      <path
        d="M13.4514 4.27626L6.95863 8.02485C6.93103 7.97685 6.89083 7.93605 6.84103 7.90725L0.619175 4.31496C0.545373 4.27266 0.575674 4.16016 0.660576 4.16016H13.2504C13.3398 4.16016 13.4124 4.20846 13.4514 4.27626Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_32_53">
        <rect width="14.0022" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tokenValue, setTokenValue] = useState(0);

  // Calculate token usage
  const estimatedTokens = estimateTokenUsage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Trigger animation by setting the token value
            setTokenValue(estimatedTokens);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: '0px',
      }
    );

    const currentRef = footerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [estimatedTokens, isVisible]);

  return (
    <footer ref={footerRef} className="py-8">
      <div className="relative my-4 -mx-5 px-5">
        <div className="max-w-[1440px] mx-auto relative">
          <div
            className="relative flex w-full items-center justify-center gap-0"
            style={{ minHeight: '24px' }}
          >
            {/* Mobile (< 1168px): flex lines, full width */}
            <div
              className="flex-1 h-px shrink-0 bg-gray-200 min-[1168px]:hidden"
              aria-hidden
            />
            {/* Footer text - always centered */}
            <p
              className="shrink-0 px-4 text-xs font-medium text-center text-gray-400 relative z-10"
              style={{ backgroundColor: 'var(--bg-weak-25)' }}
            >
              Thanks for visiting! Made in <CursorIcon /> with{' '}
              <span className="inline-flex items-baseline">
                <NumberFlow
                  value={tokenValue}
                  format={{ notation: 'compact', maximumFractionDigits: 1 }}
                  suffix=" Tokens"
                />
              </span>
            </p>
            <div
              className="flex-1 h-px shrink-0 bg-gray-200 min-[1168px]:hidden"
              aria-hidden
            />

            {/* Desktop (>= 1168px): lines end at vertical dividers */}
            <div
              className="absolute top-1/2 hidden h-px -translate-y-1/2 bg-gray-200 min-[1168px]:block"
              style={{
                left: 'calc((100% - 1048px) / 2 - 60px)',
                right: 'calc(50% + 24px)',
              }}
              aria-hidden
            />
            <div
              className="absolute top-1/2 hidden h-px -translate-y-1/2 bg-gray-200 min-[1168px]:block"
              style={{
                left: 'calc(50% + 24px)',
                right: 'calc(100% - ((100% - 1048px) / 2 + 1048px + 60px))',
              }}
              aria-hidden
            />

            {/* Desktop: junction dots at vertical divider intersections */}
            <div
              className="absolute top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 min-[1168px]:block"
              style={{ left: 'calc((100% - 1048px) / 2 - 60px)' }}
              aria-hidden
            >
              <div
                className="h-2 w-2 rounded-[2px] bg-white"
                style={{ boxShadow: DOT_BOX_SHADOW }}
              />
            </div>
            <div
              className="absolute top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 min-[1168px]:block"
              style={{ left: 'calc((100% - 1048px) / 2 + 1048px + 60px)' }}
              aria-hidden
            >
              <div
                className="h-2 w-2 rounded-[2px] bg-white"
                style={{ boxShadow: DOT_BOX_SHADOW }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
