'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RiArrowRightLongLine } from '@remixicon/react';
import { WorkExperience as WorkExperienceType } from '@/types';
import experienceData from '@/data/experience.json';

/** Figma 1-2004: radius 12px, spacing/4, custom-shadows/x-small, text/strong-950, text/sub-600 */
function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-auto rounded-[12px] bg-bg-white-0 p-4 shadow-[inset_0_-1px_1px_-0.5px_rgba(51,51,51,0.06),0_0_0_1px_#f5f5f5,0_1px_2px_rgba(51,51,51,0.04),0_2px_4px_rgba(51,51,51,0.04),0_4px_8px_-2px_rgba(51,51,51,0.06)]"
    >
      <div className="flex items-start gap-4">
        <div className="flex min-w-0 w-full flex-col gap-1">
          <h3 
            className="text-sm font-medium uppercase leading-[20px] text-text-strong-950"
            style={{ fontFamily: '__nextjs-Geist Mono' }}
          >
            STEVE CALDERON
          </h3>
          <p className="text-sm leading-5 text-text-sub-600">
            contact@stevedesignerd.com
          </p>
        </div>
        <a
          href="#"
          className="flex shrink-0 items-center gap-2 text-sm font-medium text-text-strong-950 no-underline transition-opacity hover:opacity-80 group"
        >
          <span>View Resume</span>
          <RiArrowRightLongLine className="size-5 remixicon transition-transform duration-300 ease-in-out group-hover:rotate-[-45deg]" />
        </a>
      </div>
    </motion.div>
  );
}

export default function WorkExperience() {
  const experiences = experienceData as WorkExperienceType[];

  return (
    <section className="py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column — ~40% so right stays ~600px at 1048px */}
        <div className="flex flex-col gap-8 w-full md:min-w-0 md:flex-[1_1_40%]">
          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-bg-white-0 rounded-[9px] py-1 px-2.5 w-fit shadow-[0_3px_3px_-1.5px_rgba(23,23,23,0.04),0_1px_1px_-0.5px_rgba(23,23,23,0.04),0_0_0_1px_var(--color-stroke-soft-200)]"
          >
            <span className="text-sm font-medium text-text-sub-600">
              6 years of experience
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-[40px] font-medium text-gray-900 leading-[48px]"
          >
            Building for early-stage startups with ambitious founders
          </motion.h2>

          {/* Contact Card — Figma node 1-2004: radius 12px, spacing/4, custom-shadows/x-small */}
          <ContactCard />
        </div>

        {/* Right Column - Work Experience List — ~60% (~600px at 1048px), gap-3 (12px) */}
        <div className="flex flex-col gap-3 w-full md:min-w-0 md:flex-[1_1_60%]">
          {experiences.flatMap((exp, index) => {
            const entry = (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-[88px] shrink-0 flex flex-col items-center">
                  <div className="bg-white border border-gray-200 rounded-full p-6">
                    {exp.icon ? (
                      <Image
                        src={exp.icon}
                        alt={exp.company}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {exp.company} - {exp.role}
                  </h3>
                  <p className="text-base font-medium leading-6 line-clamp-2">
                    {exp.descriptionLead != null && exp.descriptionHighlight != null ? (
                      <>
                        <span className="text-text-soft-400">{exp.descriptionLead}</span>{' '}
                        <span className="text-text-sub-600">{exp.descriptionHighlight}</span>
                      </>
                    ) : (
                      <span className="text-text-soft-400">{exp.description}</span>
                    )}
                  </p>
                  {exp.period && (
                    <p className="text-sm text-text-sub-600 font-medium mt-2">{exp.period}</p>
                  )}
                </div>
              </motion.div>
            );
            const connector =
              index < experiences.length - 1 ? (
                <div
                  key={`connector-${exp.id}`}
                  className="flex gap-6 items-center w-full"
                  role="presentation"
                  aria-hidden
                >
                  <div className="w-[88px] shrink-0 h-11 flex flex-col items-center justify-center">
                    <div className="w-0.5 h-8 bg-gray-200" />
                  </div>
                  <div className="flex-1 min-w-0" />
                </div>
              ) : null;
            return connector ? [entry, connector] : [entry];
          })}
        </div>
      </div>
    </section>
  );
}
