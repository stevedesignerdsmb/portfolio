'use client';

import { motion } from 'framer-motion';
import { CldImage } from '@/lib/cloudinary';
import Link from 'next/link';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-7 py-16"
    >
      <div className="flex flex-col items-center gap-7">
        <div className="relative w-[180px] h-[180px]">
          <CldImage
            src="portfolio/steve-profile"
            alt="Steve Calderon"
            width={180}
            height={180}
            className="rounded-full"
            priority
          />
        </div>
        <div className="text-center max-w-[333px]">
          <h1 className="text-[32px] leading-[40px] tracking-[-0.32px] font-medium">
            I&apos;m Steve, I bring products to life through{' '}
            <span className="block">design and code</span>
          </h1>
        </div>
      </div>
      <div className="flex gap-2.5 items-center">
        <Link
          href="#contact"
          className="px-2 py-2 rounded-xl bg-gradient-to-b from-white/16 to-transparent border border-white/12 shadow-lg flex items-center gap-1 text-white text-sm font-medium"
        >
          Let&apos;s talk
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M7.5 4.16667L12.5 9.16667L7.5 14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          href="#contact"
          className="px-2 py-2 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center gap-1 text-gray-600 text-sm font-medium"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M3.33333 3.33333H16.6667C17.5871 3.33333 18.3333 4.07952 18.3333 5V15C18.3333 15.9205 17.5871 16.6667 16.6667 16.6667H3.33333C2.41286 16.6667 1.66667 15.9205 1.66667 15V5C1.66667 4.07952 2.41286 3.33333 3.33333 3.33333Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M18.3333 5L10 10.8333L1.66667 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Book a call
        </Link>
      </div>
      <div className="flex gap-5 items-center mt-4">
        <div className="h-6 flex items-center gap-2">
          <span className="text-xl font-extrabold text-gray-400">SMB</span>
        </div>
        <div className="h-6 text-gray-400">MercadoLibre</div>
        <div className="h-6 text-gray-400">Other Company</div>
        <div className="h-6 text-gray-400">Another Company</div>
      </div>
    </motion.section>
  );
}
