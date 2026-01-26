'use client';

import { motion } from 'framer-motion';
import { ReactNode, Children, isValidElement, cloneElement } from 'react';

interface BlurTextProps {
  children: ReactNode;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export function BlurText({
  children,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  delay = 0,
  duration = 0.5,
}: BlurTextProps) {
  // Animation variants based on direction
  const getVariants = () => {
    const baseY = direction === 'bottom' ? 20 : direction === 'top' ? -20 : 0;
    const baseX = direction === 'right' ? 20 : direction === 'left' ? -20 : 0;

    return {
      hidden: {
        opacity: 0,
        filter: 'blur(10px)',
        y: baseY,
        x: baseX,
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        x: 0,
      },
    };
  };

  const variants = getVariants();
  let wordIndex = 0;

  // Process children to animate words
  const processChildren = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      // Split string into words and animate each
      const words = node.split(/(\s+)/);
      return (
        <>
          {words.map((word, idx) => {
            if (!word.trim() && word) {
              // Preserve spaces
              return <span key={`space-${wordIndex}-${idx}`}>{word}</span>;
            }
            if (word.trim()) {
              const currentIndex = wordIndex++;
              return (
                <motion.span
                  key={`word-${currentIndex}`}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{
                    duration,
                    delay: delay + currentIndex * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              );
            }
            return null;
          })}
        </>
      );
    }

    if (typeof node === 'number') {
      const currentIndex = wordIndex++;
      return (
        <motion.span
          key={`word-${currentIndex}`}
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{
            duration,
            delay: delay + currentIndex * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block' }}
        >
          {node}
        </motion.span>
      );
    }

    if (isValidElement(node)) {
      // Preserve element structure but process children
      const processedChildren = Children.toArray(node.props.children).map(
        processChildren
      );
      return cloneElement(node, { ...node.props }, ...processedChildren);
    }

    if (Array.isArray(node)) {
      return node.map((child, idx) => (
        <span key={idx}>{processChildren(child)}</span>
      ));
    }

    return node;
  };

  return (
    <span className={className}>
      {Children.toArray(children).map((child, idx) => (
        <span key={idx}>{processChildren(child)}</span>
      ))}
    </span>
  );
}
