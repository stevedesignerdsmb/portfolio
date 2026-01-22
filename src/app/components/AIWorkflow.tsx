'use client';

import { motion } from 'framer-motion';

const aiTools = [
  { name: 'OpenAI', icon: 'openai' },
  { name: 'Gemini', icon: 'gemini' },
  { name: 'Claude', icon: 'claude' },
  { name: 'Perplexity', icon: 'perplexity' },
];

export default function AIWorkflow() {
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
          I use it for everything: design, code, and more. What took weeks now
          takes hours.
        </p>
        <p className="text-base text-gray-900 leading-6">I use tools like:</p>
        <div className="flex items-center gap-0">
          {aiTools.map((tool, index) => (
            <div
              key={tool.name}
              className="bg-white rounded-full p-2.5 shadow-md border border-gray-100 -mr-3 first:ml-0"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
        <p className="text-base text-gray-900 leading-6">
          I believe AI is a tool, not a replacement. It gives speed. I bring
          craft.
        </p>
        <p className="text-base text-gray-900 leading-6">
          In a world of fast, generic products,{' '}
          <span className="font-medium">you need both to stand out.</span>
        </p>
      </div>
    </motion.section>
  );
}
