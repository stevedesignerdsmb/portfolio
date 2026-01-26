'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LogoLoop } from '@/app/components/ui/logo-loop';
import {
  RiBrushAiFill,
  RiFlashlightFill,
  RiDatabase2Fill,
  RiTerminalBoxFill,
} from '@remixicon/react';
import * as FancyButton from '@/app/components/ui/fancy-button';

const skills = [
  { name: 'Product Design', Icon: RiBrushAiFill },
  { name: 'Rapid Prototyping', Icon: RiFlashlightFill },
  { name: 'Database Architecture', Icon: RiDatabase2Fill },
  { name: 'Software Development', Icon: RiTerminalBoxFill },
];

const tools = [
  { name: 'Cursor', image: '/toolbox/cursor.jpg' },
  { name: 'Figma', image: '/toolbox/figma.jpg' },
  { name: 'Framer', image: '/toolbox/framer.jpg' },
  { name: 'Next.js', image: '/toolbox/next.js.jpg' },
  { name: 'Stripe', image: '/toolbox/stripe.jpg' },
  { name: 'Supabase', image: '/toolbox/supabase.jpg' },
  { name: 'Vercel', image: '/toolbox/vercel.jpg' },
  { name: 'WeWeb', image: '/toolbox/weweb.jpg' },
];

const beliefs = [
  '→ Clean design that converts',
  '→ Fast execution over perfection',
  '→ Learning whatever it takes to ship',
  '→ Building products people actually use',
];

const CALENDAR_URL = 'https://calendar.app.google/m2zcyWCGspiJSdEi6';

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(CALENDAR_URL, '_blank');
  };

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-2.5 items-stretch lg:h-[348px]"
      >
        {/* Profile Picture - Left Column */}
        <div className="w-full lg:w-auto lg:min-w-[240px] flex self-stretch min-h-0">
          <div 
            className="bg-white rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-full w-full min-h-0"
            style={{
              boxShadow: '0 40px 40px -20px rgba(23, 23, 23, 0.06), 0 10px 10px -5px rgba(23, 23, 23, 0.06), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 6px 0 rgba(255, 255, 255, 0.24) inset'
            }}
          >
            <Image
              src="/portfoliopic.jpg"
              alt="Steve Calderon"
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Text and Beliefs - Middle Column */}
        <div className="flex-1 lg:flex-[4] flex self-stretch min-h-0">
          <div className="bg-white rounded-3xl p-8 flex flex-col gap-7 h-full w-full min-h-0">
            <h2 className="text-3xl font-medium text-gray-900 leading-[38px] tracking-[-0.4px]">
              Started as a designer. Now I&apos;m more than that...
            </h2>
            <div className="flex flex-col gap-2.5">
              <p className="text-base text-gray-400 font-medium">I believe in:</p>
              <div className="flex flex-col gap-3">
                {beliefs.map((belief, index) => (
                  <p key={index} className="text-lg text-gray-600 font-medium">
                    {belief}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Toolbox - Right Column */}
        <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-[1] lg:max-w-[242px] min-h-0 self-stretch">
          <div className="bg-white rounded-3xl p-5 flex flex-col gap-2 flex-shrink-0">
            <h3 className="text-base text-gray-400 font-medium mb-2">Skills</h3>
            {skills.map((skill) => {
              const Icon = skill.Icon;
              return (
                <div key={skill.name} className="flex gap-2 items-center">
                  <Icon className="size-[18px] text-gray-400 flex-shrink-0" />
                  <p className="text-base text-gray-900 font-medium">{skill.name}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-5 flex flex-col justify-between flex-1 min-h-0 overflow-hidden">
            <h3 className="text-base font-medium flex-shrink-0" style={{ color: 'var(--color-text-soft-400)' }}>Toolbox</h3>
            <div className="w-full flex-shrink-0">
              <LogoLoop logos={tools} className="w-full" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section - Below Three Columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-3 items-center mt-12"
        style={{ height: '100%' }}
      >
        <p className="text-base text-center flex flex-col">
          <span className="text-gray-400 font-medium">Need more than a designer? </span>
          <span className="text-base text-gray-900 font-medium leading-6">I&apos;m ready when you are.</span>
        </p>
        <FancyButton.Root
          type="button"
          variant="basic"
          size="small"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FancyButton.Icon as="span" className="relative overflow-hidden">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: isHovered ? -20 : 0,
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.125 14.725C3.125 15.2222 3.53124 15.625 4.03176 15.625H4.04479C3.53661 15.625 3.125 15.2222 3.125 14.725Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.9167 7.74998V10.0997L14.0846 7.54448V5.275C14.0846 4.77775 13.6784 4.375 13.1779 4.375H6.31473L6.30859 7.74998H10.9167Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.918 12.4504H6.30224L6.29688 15.6252H13.1792C13.6805 15.6252 14.086 15.2224 14.086 14.7252V12.6762L10.918 10.1007V12.4504V12.4504Z"
                  fill="#34A853"
                />
                <path d="M6.31514 4.375L3.125 7.74998H6.30977L6.31514 4.375Z" fill="#EA4335" />
                <path
                  d="M3.125 12.4502V14.725C3.125 15.2222 3.53661 15.625 4.04479 15.625H6.29597L6.30134 12.4502H3.125V12.4502Z"
                  fill="#1967D2"
                />
                <path d="M6.30977 7.74997H3.125V12.4502H6.30134L6.30977 7.74997Z" fill="#4285F4" />
                <path
                  d="M16.8706 13.9249V6.19996C16.692 5.17472 15.5676 6.34996 15.5676 6.34996L14.0859 7.54471V12.6754L16.2068 14.3997C16.9725 14.5002 16.8706 13.9249 16.8706 13.9249Z"
                  fill="#34A853"
                />
                <path d="M10.918 10.0997L14.0866 12.676V7.54524L10.918 10.0997Z" fill="#188038" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.125 14.725C3.125 15.2222 3.53124 15.625 4.03176 15.625H4.04479C3.53661 15.625 3.125 15.2222 3.125 14.725Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.9167 7.74998V10.0997L14.0846 7.54448V5.275C14.0846 4.77775 13.6784 4.375 13.1779 4.375H6.31473L6.30859 7.74998H10.9167Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.918 12.4504H6.30224L6.29688 15.6252H13.1792C13.6805 15.6252 14.086 15.2224 14.086 14.7252V12.6762L10.918 10.1007V12.4504V12.4504Z"
                  fill="#34A853"
                />
                <path d="M6.31514 4.375L3.125 7.74998H6.30977L6.31514 4.375Z" fill="#EA4335" />
                <path
                  d="M3.125 12.4502V14.725C3.125 15.2222 3.53661 15.625 4.04479 15.625H6.29597L6.30134 12.4502H3.125V12.4502Z"
                  fill="#1967D2"
                />
                <path d="M6.30977 7.74997H3.125V12.4502H6.30134L6.30977 7.74997Z" fill="#4285F4" />
                <path
                  d="M16.8706 13.9249V6.19996C16.692 5.17472 15.5676 6.34996 15.5676 6.34996L14.0859 7.54471V12.6754L16.2068 14.3997C16.9725 14.5002 16.8706 13.9249 16.8706 13.9249Z"
                  fill="#34A853"
                />
                <path d="M10.918 10.0997L14.0866 12.676V7.54524L10.918 10.0997Z" fill="#188038" />
              </svg>
            </motion.div>
          </FancyButton.Icon>
          Book a call
        </FancyButton.Root>
      </motion.div>
    </section>
  );
}
