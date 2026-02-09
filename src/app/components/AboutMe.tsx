'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  RiBrushAiFill,
  RiDatabase2Fill,
  RiTerminalBoxFill,
  RiFundsFill,
  RiFlashlightFill,
  RiChatSmile2Fill,
} from '@remixicon/react';
import { LineShadowText } from './ui/line-shadow-text';

const NumberFlow = dynamic(
  () => import('@number-flow/react').then((m) => ({ default: m.default })),
  { ssr: false, loading: () => <span>0</span> }
);

const UnicornScene = dynamic(
  () => import('unicornstudio-react/next').then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[200px] bg-gray-800 animate-pulse rounded-lg" />
    ),
  }
);

const skills = [
  { name: 'Product Design', Icon: RiBrushAiFill },
  { name: 'Database Architecture', Icon: RiDatabase2Fill },
  { name: 'Software development', Icon: RiTerminalBoxFill },
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

const techStackTools = [
  { name: 'Figma', image: '/toolbox/figma.jpg' },
  { name: 'Cursor', image: '/toolbox/cursor.jpg' },
  { name: 'Next.js', image: '/toolbox/next.js.jpg' },
  { name: 'Vercel', image: '/toolbox/vercel.jpg' },
  { name: 'Framer', image: '/toolbox/framer.jpg' },
];

const beliefs = [
  {
    Icon: RiFundsFill,
    iconColor: 'text-blue-500',
    text: 'I believe in clean designs',
    bold: 'that converts.',
  },
  {
    Icon: RiFlashlightFill,
    iconColor: 'text-orange-500',
    text: 'I believe in fast execution',
    bold: 'over perfection',
  },
  {
    Icon: RiChatSmile2Fill,
    iconColor: 'text-purple-500',
    text: 'I believe in learning whatever it',
    bold: 'takes to ship',
  },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [numberValue, setNumberValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setNumberValue(10);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16">
      {/* Header – same styles as WorkExperience section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-title-h2 font-medium text-text-strong-950 mb-2">
          I design, code, and ship—<LineShadowText shadowColor="var(--color-text-strong-950)" className="italic font-medium">fast</LineShadowText>.
        </h2>
        <p className="text-[16px] leading-[24px] text-text-soft-400 font-medium">
          No handoffs. No waiting. Just shipped products.
        </p>
      </motion.div>

      {/* Two columns: left 2/3 (two equal-width cards) | right 1/3 (one card). All 3 cards same width. max 932px */}
      <div className="max-w-[916px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-2.5 items-stretch min-h-0 lg:min-h-[410px] bg-[var(--bg-weak-25)] p-1 rounded-[32px]"
        >
          {/* Left column: 2/3 width, two cards side by side (Happy customers + Skills | 0→100), each card = 1/3 row */}
          <div className="flex-none min-w-0 lg:flex-[2_1_0] min-h-0 flex flex-col lg:flex-row gap-2.5 p-2 rounded-[28px] bg-[var(--bg-white-0)] lg:min-h-[410px]">
            <div
              className="flex-none min-h-0 min-w-0 lg:flex-1 flex flex-col gap-2 rounded-[28px] bg-white"
              style={{ boxShadow: 'none' }}
            >
              <div
                className="flex-none min-h-0 lg:flex-1 p-6 flex flex-col justify-start items-start rounded-[20px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/happybg.png)' }}
              >
                <span className="text-text-white-0 font-medium inline-flex items-baseline text-title-h1">
                  <NumberFlow
                  value={isVisible ? numberValue : 0}
                  suffix="+"
                  transformTiming={{ duration: 600, easing: 'ease-out' }}
                />
                </span>
                <p className="text-text-white-0 text-label-lg font-medium mt-1">Finished projects</p>
              </div>
              <div className="flex-none min-h-0 lg:flex-1 rounded-[20px] bg-[var(--bg-weak-25)] p-6 flex flex-col justify-between gap-2">
                <h3 className="text-[16px] leading-[24px] text-text-soft-400 font-medium">What I bring:</h3>
                <div className="flex flex-col gap-2">
                  {skills.map((skill) => {
                    const Icon = skill.Icon;
                    return (
                      <div key={skill.name} className="flex gap-2 items-center">
                        <Icon className="size-[18px] text-gray-400 flex-shrink-0" />
                        <p className="text-label-md text-text-strong-950 font-medium">{skill.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className="relative flex-none min-h-0 min-w-0 lg:flex-1 rounded-[28px] overflow-hidden p-6 flex flex-col"
              style={{ boxShadow: 'none', backgroundColor: '#000' }}
            >
              <p className="text-label-lg text-white/90 font-medium mb-3">
                I help you get your product in production in weeks, not months. I&apos;m all about speed, fun and craft.
              </p>
              <div className="w-full flex-1 min-h-[200px] rounded-lg overflow-hidden">
                <UnicornScene
                  projectId="G5vb7CufTaV2vB65AwuF"
                  sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
                  width="100%"
                  height="100%"
                  lazyLoad
                  production
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 z-[100000000]" style={{ backgroundColor: '#000' }} aria-hidden />
            </div>
          </div>

          {/* Right column: 1/3 width, one card (Testimonial), same card width as the two on the left */}
          <div className="flex-none min-w-0 lg:flex-[1_1_0] min-h-0 flex flex-col p-2 rounded-[28px] bg-[var(--bg-white-0)]">
            <div
              className="flex-1 min-h-0 rounded-[20px] overflow-hidden bg-[var(--bg-weak-25)] p-6 flex flex-col min-h-[200px] lg:min-h-0"
              style={{ boxShadow: 'none' }}
            >
              <svg
                width={74}
                height={24}
                viewBox="0 0 74 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 flex-shrink-0"
                aria-label="SMB"
              >
                <path d="M10.3579 6.96353L0 9.48227V7.13232C0 5.55497 1.07929 4.18208 2.61146 3.81004L10.3579 1.92603V6.96353Z" fill="#7D52F4" />
                <path d="M2.61146 15.154L10.3579 17.0379V12.0004L0 9.48169V11.8317C0 13.409 1.07929 14.7818 2.61146 15.154Z" fill="#7D52F4" />
                <path d="M10.3594 17.0367L20.7172 14.5181V16.868C20.7172 18.4453 19.638 19.8183 18.1058 20.1903L10.3594 22.0743V17.0367Z" fill="#7D52F4" />
                <path d="M18.1059 8.84592L10.3594 6.96191V11.9994L20.7173 14.5181V12.1682C20.7173 10.5909 19.638 9.21797 18.1059 8.84592Z" fill="#7D52F4" />
                <path d="M37.6025 11.26C37.5092 11.1667 37.2958 11.04 36.9625 10.88C36.6292 10.7067 36.2358 10.5533 35.7825 10.42C35.3292 10.2733 34.8625 10.2 34.3825 10.2C33.9158 10.2 33.5558 10.26 33.3025 10.38C33.0625 10.5 32.9425 10.68 32.9425 10.92C32.9425 11.1467 33.0358 11.3267 33.2225 11.46C33.4225 11.58 33.7092 11.6933 34.0825 11.8C34.4558 11.8933 34.9092 12.02 35.4425 12.18C36.2158 12.38 36.8825 12.6133 37.4425 12.88C38.0158 13.1467 38.4558 13.4933 38.7625 13.92C39.0825 14.3467 39.2425 14.9133 39.2425 15.62C39.2425 16.2733 39.1158 16.8267 38.8625 17.28C38.6092 17.7333 38.2625 18.1 37.8225 18.38C37.3825 18.6467 36.8892 18.84 36.3425 18.96C35.8092 19.08 35.2492 19.14 34.6625 19.14C33.7558 19.14 32.8358 19.02 31.9025 18.78C30.9825 18.5267 30.1692 18.1933 29.4625 17.78L30.7225 15.28C30.8558 15.4133 31.1158 15.58 31.5025 15.78C31.9025 15.98 32.3825 16.16 32.9425 16.32C33.5025 16.48 34.0892 16.56 34.7025 16.56C35.1825 16.56 35.5358 16.5 35.7625 16.38C36.0025 16.26 36.1225 16.0933 36.1225 15.88C36.1225 15.64 35.9958 15.4533 35.7425 15.32C35.5025 15.1733 35.1625 15.04 34.7225 14.92C34.2825 14.8 33.7825 14.6667 33.2225 14.52C32.4758 14.3067 31.8625 14.0667 31.3825 13.8C30.9158 13.52 30.5625 13.18 30.3225 12.78C30.0958 12.3667 29.9825 11.8733 29.9825 11.3C29.9825 10.5133 30.1825 9.84667 30.5825 9.3C30.9958 8.75333 31.5425 8.34 32.2225 8.06C32.9158 7.78 33.6625 7.64 34.4625 7.64C35.3292 7.64 36.1425 7.77333 36.9025 8.04C37.6758 8.30667 38.3225 8.58667 38.8425 8.88L37.6025 11.26ZM50.9652 19V12.72L48.2052 17.2H46.6652L43.9052 12.72V19H41.0252V7.74H44.1452L47.4452 13.3L50.7252 7.74H53.8452V19H50.9652ZM66.5581 16.12C66.5581 16.7733 66.3648 17.3133 65.9781 17.74C65.6048 18.1667 65.0981 18.4867 64.4581 18.7C63.8181 18.9 63.1115 19 62.3381 19H56.3181V7.74H63.1981C63.7848 7.74 64.2848 7.88 64.6981 8.16C65.1248 8.44 65.4515 8.80667 65.6781 9.26C65.9048 9.7 66.0181 10.16 66.0181 10.64C66.0181 11.16 65.8648 11.6667 65.5581 12.16C65.2648 12.64 64.8315 12.9933 64.2581 13.22C64.9648 13.4067 65.5248 13.74 65.9381 14.22C66.3515 14.7 66.5581 15.3333 66.5581 16.12ZM63.6381 15.52C63.6381 15.32 63.5848 15.14 63.4781 14.98C63.3715 14.8067 63.2315 14.6733 63.0581 14.58C62.8848 14.4867 62.6848 14.44 62.4581 14.44H59.1981V16.58H62.3381C62.5781 16.58 62.7915 16.54 62.9781 16.46C63.1781 16.3667 63.3381 16.24 63.4581 16.08C63.5781 15.92 63.6381 15.7333 63.6381 15.52ZM59.1981 10.2V12.18H61.9781C62.1915 12.18 62.3848 12.1467 62.5581 12.08C62.7448 12.0133 62.8915 11.9067 62.9981 11.76C63.1181 11.6133 63.1781 11.42 63.1781 11.18C63.1781 10.9533 63.1248 10.7733 63.0181 10.64C62.9248 10.4933 62.7915 10.3867 62.6181 10.32C62.4581 10.24 62.2781 10.2 62.0781 10.2H59.1981Z" fill="#171717" />
              </svg>
              <div className="flex-1 min-h-0 flex flex-col justify-end">
                <p className="text-[16px] leading-[24px] text-text-soft-400 font-medium">
                  &lsquo;Steve is a true UX rockstar. He worked incredibly fast, understood the problem almost immediately, and{' '}
                  <strong className="text-text-strong-950 font-medium leading-[24px]">constantly pushed the quality of the work higher</strong>&rsquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden relative">
                  <Image
                    src="/mike.jpg"
                    alt="Mike Hillenmeyer"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-paragraph-md font-medium text-text-strong-950">Mike Hillenmeyer</p>
                  <p className="text-[16px] leading-[24px] text-text-soft-400 font-medium">Co-founder</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Belief statements row – matches Figma: separators, centered columns, white icon circles, typography */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-[916px] mx-auto mt-10"
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-3 py-10 border-t border-b border-[var(--color-stroke-soft-200)]"
        >
          {beliefs.map(({ Icon, iconColor, text, bold }, index) => (
            <div
              key={bold}
              className={[
                'flex flex-col items-center text-center px-6 py-4',
                index < beliefs.length - 1 ? 'md:border-r border-gray-200' : '',
              ].join(' ')}
            >
              <div
                className={`rounded-full bg-white p-3 flex-shrink-0 ${iconColor}`}
                style={{
                  boxShadow: '0 3px 3px -1.5px var(--shadow-gray-shadow-6, rgba(23, 23, 23, 0.06)), 0 1px 1px -0.5px var(--shadow-gray-shadow-6, rgba(23, 23, 23, 0.06)), 0 0 0 1px var(--shadow-gray-shadow-2, rgba(23, 23, 23, 0.02))'
                }}
                aria-hidden
              >
                <Icon className="size-6" />
              </div>
              <p className="text-[16px] leading-[24px] text-text-soft-400 font-medium mt-3">
                {text}
              </p>
              <p className="text-[16px] leading-[24px] text-text-strong-950 font-medium mt-0.5">
                {bold}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <p className="text-[16px] leading-[24px] text-text-soft-400 font-medium mb-4">My tech stack includes</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {techStackTools.map((tool) => (
            <div
              key={tool.name}
              className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
            >
              <Image
                src={tool.image}
                alt={tool.name}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
