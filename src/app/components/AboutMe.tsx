'use client';

import { motion } from 'framer-motion';
import { CldImage } from '@/lib/cloudinary';

const skills = [
  { name: 'Product Design', icon: 'brush' },
  { name: 'Rapid Prototyping', icon: 'flashlight' },
  { name: 'Database Architecture', icon: 'database' },
  { name: 'Software Development', icon: 'terminal' },
];

const tools = [
  { name: 'Figma', image: 'figma-icon' },
  { name: 'React', image: 'react-icon' },
  { name: 'Supabase', image: 'supabase-icon' },
  { name: 'WeWeb', image: 'weweb-icon' },
  { name: 'Next.js', image: 'nextjs-icon' },
];

const beliefs = [
  '→ Clean design that converts',
  '→ Fast execution over perfection',
  '→ Learning whatever it takes to ship',
  '→ Building products people actually use',
];

export default function AboutMe() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-12 items-start"
      >
        <div className="flex-1">
          <div className="bg-white rounded-3xl p-10 flex flex-col gap-10">
            <h2 className="text-4xl font-medium text-gray-900 leading-[48px] tracking-[-0.4px]">
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

        <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[242px]">
          <div className="bg-white rounded-3xl p-6 flex flex-col gap-2">
            <h3 className="text-base text-gray-400 font-medium mb-2">Skills</h3>
            {skills.map((skill) => (
              <div key={skill.name} className="flex gap-2 items-center">
                <div className="w-4.5 h-4.5 text-gray-400">
                  <svg viewBox="0 0 18 18" fill="currentColor">
                    <path d="M9 0L11.5 6.5L18 9L11.5 11.5L9 18L6.5 11.5L0 9L6.5 6.5L9 0Z" />
                  </svg>
                </div>
                <p className="text-base text-gray-900 font-medium">{skill.name}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 flex flex-col gap-6">
            <h3 className="text-base text-gray-600 font-medium">Toolbox</h3>
            <div className="flex gap-2.5 items-center justify-between">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100"
                >
                  <CldImage
                    src={`portfolio/${tool.image}`}
                    alt={tool.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
