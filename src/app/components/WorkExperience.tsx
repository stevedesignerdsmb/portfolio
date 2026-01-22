'use client';

import { motion } from 'framer-motion';
import { WorkExperience as WorkExperienceType } from '@/types';
import experienceData from '@/data/experience.json';
import { CldImage } from '@/lib/cloudinary';

export default function WorkExperience() {
  const experiences = experienceData as WorkExperienceType[];

  return (
    <section className="py-16">
      <div className="flex flex-col gap-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-6 items-start"
          >
            <div className="bg-white border border-gray-200 rounded-full p-6 shrink-0">
              {exp.icon ? (
                <CldImage
                  src={`portfolio/${exp.icon}`}
                  alt={exp.company}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {exp.company} - {exp.role}
              </h3>
              <p className="text-base text-gray-600 leading-6">
                {exp.description}
              </p>
              {exp.period && (
                <p className="text-sm text-gray-400 mt-2">{exp.period}</p>
              )}
            </div>
            {index < experiences.length - 1 && (
              <div className="w-0.5 h-8 bg-gray-200 ml-11" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
