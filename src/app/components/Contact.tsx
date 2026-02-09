'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RiMailLine,
  RiWhatsappLine,
} from '@remixicon/react';

const contactLinks = [
  {
    href: 'mailto:contact@stevedesignerd.com',
    label: 'contact@stevedesignerd.com',
    icon: RiMailLine,
  },
  {
    href: 'https://wa.me/+573202070035',
    label: 'Whatsapp',
    icon: RiWhatsappLine,
  },
  {
    href: 'https://x.com/stevedesignerd',
    label: 'X (Twitter)',
    icon: null,
  },
  {
    href: 'https://www.linkedin.com/in/steve-calderon-549b2b1aa/',
    label: 'Linkedin',
    icon: null,
  },
];

export default function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="flex flex-col gap-4 items-center">
        <h2
          className="text-[72px] leading-[80px] sm:text-[100px] sm:leading-[108px] md:text-[130px] md:leading-[130px] min-[1168px]:text-[178px] min-[1168px]:leading-[178px] font-medium text-center tracking-[-0.04em] min-[1168px]:tracking-[-5.34px]"
          style={{
            color: 'transparent',
            WebkitTextStrokeWidth: '1.4px',
            WebkitTextStrokeColor: 'var(--stroke-sub-300, #D1D1D1)',
          }}
        >
          Find me in
        </h2>
        <div className="bg-gray-200 rounded-2xl md:rounded-full p-2 md:p-1 flex flex-col md:flex-row gap-2 md:gap-1 w-full max-w-sm mx-auto md:mx-0 md:max-w-none md:w-auto items-stretch md:items-center relative overflow-hidden">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                className="relative z-10 rounded-xl md:rounded-full px-3 py-2.5 flex items-center justify-center md:justify-start gap-2 overflow-hidden w-full md:w-auto"
                style={{
                  boxShadow: '0 3px 3px -1.5px var(--shadow-gray-shadow-6, rgba(23, 23, 23, 0.06)), 0 1px 1px -0.5px var(--shadow-gray-shadow-6, rgba(23, 23, 23, 0.06)), 0 0 0 1px var(--shadow-gray-shadow-2, rgba(23, 23, 23, 0.02))',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  color: isHovered
                    ? 'var(--color-text-white-0)'
                    : 'var(--color-text-strong-950)',
                  backgroundColor: isHovered
                    ? 'transparent'
                    : 'white',
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Morphing background indicator - rounded-xl on mobile to match link, pill on desktop */}
                {isHovered && (
                  <motion.div
                    layoutId="hover-pill-bg"
                    className="absolute inset-0 rounded-xl md:rounded-full pointer-events-none"
                    style={{
                      backgroundColor: 'var(--color-bg-strong-950)',
                      zIndex: 0,
                    }}
                    transition={{
                      layout: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 40,
                        mass: 0.8,
                      },
                    }}
                  />
                )}
                {Icon && (
                  <motion.div
                    className="relative overflow-hidden z-10"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ y: 0, opacity: 1 }}
                      animate={{
                        y: isHovered ? -20 : 0,
                        opacity: isHovered ? 0 : 1,
                        color: isHovered
                          ? 'var(--color-text-white-0)'
                          : 'var(--color-text-strong-950)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <Icon className="size-5 remixicon" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: isHovered ? 0 : 20,
                        opacity: isHovered ? 1 : 0,
                        color: 'var(--color-text-white-0)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <Icon className="size-5 remixicon" />
                    </motion.div>
                  </motion.div>
                )}
                <span className="relative overflow-hidden inline-block text-lg font-medium whitespace-nowrap z-10">
                  <motion.span
                    className="block"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                      y: isHovered ? -20 : 0,
                      opacity: isHovered ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {link.label}
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 flex items-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: isHovered ? 0 : 20,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {link.label}
                  </motion.span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
