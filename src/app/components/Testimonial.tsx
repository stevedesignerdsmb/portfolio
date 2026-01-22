'use client';

import { motion } from 'framer-motion';
import { CldImage } from '@/lib/cloudinary';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export default function Testimonial({
  quote,
  author,
  role,
  avatar,
}: TestimonialProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-3xl p-5 flex flex-col gap-4 items-center max-w-[455px]"
    >
      <p className="text-sm text-gray-600 text-center leading-5 font-medium">
        {quote}
      </p>
      <div className="flex flex-col gap-0.5 items-center">
        <div className="flex gap-1 items-center">
          {avatar && (
            <CldImage
              src={avatar}
              alt={author}
              width={18}
              height={18}
              className="rounded-full"
            />
          )}
          <h3 className="text-base font-medium text-gray-900">{author}</h3>
        </div>
        <p className="text-sm text-gray-400 font-medium">{role}</p>
      </div>
    </motion.section>
  );
}
