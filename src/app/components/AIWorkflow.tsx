'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  RiOpenaiFill,
  RiGeminiFill,
  RiClaudeFill,
  RiPerplexityFill,
} from '@remixicon/react';

const aiTools = [
  {
    name: 'ChatGPT',
    icon: RiOpenaiFill,
    color: '#000000',
  },
  {
    name: 'Gemini',
    icon: RiGeminiFill,
    color: '#0088FF',
  },
  {
    name: 'Claude',
    icon: RiClaudeFill,
    color: '#FF8D28',
  },
  {
    name: 'Perplexity',
    icon: RiPerplexityFill,
    color: '#00C8B3',
  },
];

export default function AIWorkflow() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="flex flex-col gap-4 items-center max-w-[400px] mx-auto text-center">
        <p className="text-base text-gray-900 leading-6">
          AI changed the game.
        </p>
        <p className="text-base text-gray-900 leading-6">
          I use it for everything: design, code, and more. <br />
          What took weeks now takes hours.
        </p>
        <p className="text-base text-gray-900 leading-6">I use tools like:</p>
        <div className="flex items-center gap-0 relative">
          {aiTools.map((tool, index) => {
            const Icon = tool.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={tool.name}
                className="relative bg-white rounded-full p-2.5 shadow-md border border-gray-100 -mr-3 first:ml-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={false}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -8 : 0,
                  zIndex: isHovered ? 10 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                }}
                style={{
                  cursor: 'pointer',
                }}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: tool.color }} />
                </motion.div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                        mass: 0.3,
                      }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-1.5 py-0.5 rounded text-white text-xs leading-4 font-medium whitespace-nowrap pointer-events-none"
                      style={{
                        backgroundColor: tool.color,
                        height: '20px',
                      }}
                    >
                      {tool.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <p className="text-base text-gray-900 leading-6">
          I believe AI is a tool, not a replacement.<br />
          It gives speed. I bring craft.
        </p>
        <p className="text-base text-gray-900 leading-6">
          In a world of fast, generic products, <br />
          <span className="font-medium">you need both to stand out.</span>
        </p>
      </div>
    </motion.section>
  );
}
