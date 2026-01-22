'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CldImage } from '@/lib/cloudinary';
import { getAllProjects } from '@/lib/projects';
import { Visual } from '@/types';
import visualsData from '@/data/visuals.json';
import Link from 'next/link';

type TabType = 'visuals' | 'projects' | 'motion';

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState<TabType>('visuals');
  const projects = getAllProjects();
  const visuals = visualsData as Visual[];

  return (
    <section className="py-16">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <div className="bg-gray-50 rounded-full p-1 flex gap-0">
            <button
              onClick={() => setActiveTab('visuals')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === 'visuals'
                  ? 'bg-white shadow-md text-gray-600'
                  : 'text-gray-400'
              }`}
            >
              Visuals
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-white shadow-md text-gray-600'
                  : 'text-gray-400'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('motion')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === 'motion'
                  ? 'bg-white shadow-md text-gray-600'
                  : 'text-gray-400'
              }`}
            >
              Motion
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {activeTab === 'visuals' && (
            <div className="border border-gray-200 rounded-[40px] p-2.5">
              <div className="bg-gray-50 rounded-[32px] p-2.5">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="aspect-[1048/654] w-full">
                    <CldImage
                      src="portfolio/visuals-gallery"
                      alt="Visuals Gallery"
                      width={1048}
                      height={654}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group"
                >
                  <div className="border border-gray-200 rounded-3xl p-4 hover:shadow-lg transition-shadow">
                    <div className="aspect-video mb-4 rounded-2xl overflow-hidden bg-gray-100">
                      <CldImage
                        src={`portfolio/${project.image}`}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'motion' && (
            <div className="border border-gray-200 rounded-[40px] p-2.5">
              <div className="bg-gray-50 rounded-[32px] p-2.5">
                <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[400px] flex flex-col items-center justify-center gap-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-gray-900 font-medium mb-2">Interactive Animations</p>
                    <p className="text-gray-600 text-sm">
                      Motion collection with Framer Motion
                    </p>
                  </motion.div>
                  <div className="flex gap-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-gray-100 rounded-xl cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
