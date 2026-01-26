'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiFileCopyLine, RiCheckboxCircleFill } from '@remixicon/react';
import * as Button from '@/app/components/ui/button';

const EMAIL = 'contact@stevedesignerd.com';

export default function Header() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleOpenTwitter = () => {
    window.open('https://x.com/stevedesignerd', '_blank', 'noopener,noreferrer');
  };

  const animationConfig = {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-5 h-14 flex items-center justify-between">
        <div className="max-w-[1048px] mx-auto w-full flex items-center justify-between">
          <Button.Root
            variant="neutral"
            mode="ghost"
            size="xsmall"
            onClick={handleOpenTwitter}
            aria-label="Open X (Twitter) profile"
          >
            <span>X (Twitter)</span>
          </Button.Root>
          <Button.Root
            variant="neutral"
            mode="ghost"
            size="xsmall"
            onClick={handleCopyEmail}
            aria-label={copied ? 'Email copied' : 'Copy email'}
          >
          <motion.span
            animate={{
              color: copied ? 'var(--color-success-base)' : 'var(--color-text-sub-600)',
            }}
            transition={animationConfig}
          >
            Copy my email
          </motion.span>
          <div className="relative w-5 h-5 flex items-center justify-center" style={{ transform: 'translateZ(0)' }}>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    rotate: 10,
                    filter: 'blur(4px)',
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: [0.5, 1.1, 1],
                    rotate: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    rotate: -10,
                    filter: 'blur(4px)',
                  }}
                  transition={{
                    ...animationConfig,
                    scale: {
                      times: [0, 0.7, 1],
                      duration: 0.3,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  <RiCheckboxCircleFill
                    className="size-5 shrink-0 remixicon"
                    style={{ color: 'var(--color-success-base)' }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0,
                    filter: 'blur(0px)',
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    rotate: -10,
                    filter: 'blur(4px)',
                  }}
                  transition={animationConfig}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  <RiFileCopyLine className="size-5 shrink-0 remixicon" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Button.Root>
        </div>
      </div>
    </header>
  );
}
