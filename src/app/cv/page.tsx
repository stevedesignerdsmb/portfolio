import type { Metadata } from 'next';
import { Pad } from '@/components/Blocks';
import { ResumeDoc } from '@/components/ResumeDoc';
import { resume, resumePdf } from '@/content/resume';

export const metadata: Metadata = {
  title: 'Résumé',
  description: `${resume.name}, ${resume.headline}. ${resume.summary}`,
  alternates: { canonical: '/cv' },
};

/** Crawlable copy of the pop-up, and the page the PDF is printed from. */
export default function CV() {
  return (
    <Pad className="pb-16 pt-10 lg:pt-14">
      <div className="cv-page-bar mb-6 flex items-center justify-between gap-4">
        <p className="label">Résumé</p>
        <a href={resumePdf} download="Steve-Calderon-CV.pdf" className="basic-link text-[14px]">
          Download PDF
        </a>
      </div>
      <div className="cv-paper cv-paper-page">
        <ResumeDoc id="cv" />
      </div>
    </Pad>
  );
}
