'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiFileCopyLine, RiCheckboxCircleFill } from '@remixicon/react';
import * as Button from '@/app/components/ui/button';

const EMAIL = 'contact@stevedesignerd.com';

const slideTransition = {
  duration: 0.25,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

export default function Header() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
    }
  }, [copied]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleOpenTwitter = () => {
    window.open('https://x.com/stevedesignerd', '_blank', 'noopener,noreferrer');
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
            className="min-w-[151px] overflow-hidden"
            aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={slideTransition}
                >
                  <span>Copied!</span>
                  <RiCheckboxCircleFill className="size-5 shrink-0 remixicon" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={slideTransition}
                >
                  <span>Copy my email</span>
                  <RiFileCopyLine className="size-5 shrink-0 remixicon" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button.Root>
        </div>
      </div>
    </header>
  );
}
