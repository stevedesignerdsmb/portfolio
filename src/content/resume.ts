/**
 * Résumé: one source for the pop-up, the /cv page, the PDF and llms.txt.
 * Written for ATS parsers: one column, plain section names, real text.
 * The PDF in public/ is printed from /cv; re-export it after editing
 * (see scripts/export-cv.sh).
 */
import { site } from './site';

export const resumePdf = '/steve-calderon-cv.pdf';

export type ResumeRole = {
  title: string;
  company: string;
  url?: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export const resume = {
  name: site.name,
  headline: 'Design Engineer · Product Designer',
  location: `${site.location}, ${site.country}`,
  email: site.email,
  links: [
    { label: 'stevedesignerd.com', href: site.url },
    { label: 'linkedin.com/in/steve-calderon-549b2b1aa', href: site.linkedin },
    { label: 'x.com/stevedesignerd', href: site.x },
  ],
  summary:
    'Design engineer with 6 years of experience designing product interfaces and building them in code, across fintech, marketplaces and AI products. I take features from the first sketch to production React, have also shipped products on low-code platforms, and work with AI tools every day. Previously at SMB.co and Mercado Libre.',
  experience: [
    {
      title: 'Design Engineer',
      company: 'Kiiex',
      url: 'https://kiiex.io',
      start: '2026',
      end: 'Present',
      bullets: [
        'Design and build the interface for cross-border payments and trading, from flows to production front-end code.',
        'Prototype and ship with AI-assisted workflows (Claude Code, Codex) alongside product and engineering.',
      ],
    },
    {
      title: 'Design Engineer',
      company: 'SMB.co',
      url: 'https://smb.co',
      start: '2024',
      end: '2026',
      bullets: [
        'Designed and built use cases for the AI agent: landing pages, the in-chat flow and the agent skills on Cloudflare, shipped in two weeks; owners went from 0 to 150 goals.',
        'Redesigned dashboard and onboarding flows that raised user activation by 18% through data-informed iteration and usability testing.',
        'Built the design system and React component library shared by product and engineering, cutting build time by about 25%.',
      ],
    },
    {
      title: 'Design Engineer',
      company: 'Mvnifest',
      url: 'https://mvnifest.com',
      start: '2023',
      end: '2024',
      bullets: [
        'Led product design for lifecycle management tools from concept to production, including dashboards and analytics views that improved onboarding completion and retention.',
        'Defined personas, journey maps and information architecture for the roadmap; mentored junior designers.',
      ],
    },
    {
      title: 'Senior Product Designer',
      company: 'Mercado Libre',
      url: 'https://www.mercadolibre.com',
      start: '2021',
      end: '2023',
      bullets: [
        'Designed seller tools, payment flows and marketplace features used by millions of people across Latin America.',
        'Ran usability testing and research that reduced friction in seller onboarding; standardized interaction patterns across internal products.',
        'Prioritized features with product managers and data teams using metrics and A/B test results.',
      ],
    },
    {
      title: 'UI/UX Designer',
      company: 'Pixelspace',
      start: '2020',
      end: '2021',
      bullets: [
        'Designed web and mobile products for B2B and consumer clients, from discovery to prototypes and handoff.',
      ],
    },
  ] satisfies ResumeRole[],
  projects: [
    {
      name: 'Fina',
      href: `${site.url}/work/fina`,
      text: 'Money assistant in WhatsApp, ChatGPT and Claude that logs purchases from bank notifications. Designed and built end to end (AI pipeline, WhatsApp agent, MCP server); official ChatGPT plugin, 60 users and about 1,000 purchases in its first weeks.',
    },
    {
      name: 'Curio',
      href: `${site.url}/work/curio`,
      text: 'iPhone app for learning a topic in minutes and explaining it out loud, with real-time speaking feedback (ElevenLabs). Designed and built in SwiftUI; live on the App Store in English and Spanish.',
    },
  ],
  skills: [
    { label: 'Design', items: 'Product design, UX/UI, interaction design, design systems, prototyping, user research, A/B testing, Figma' },
    { label: 'Engineering', items: 'React, Next.js, TypeScript, JavaScript, Vue, SwiftUI, Tailwind CSS, Supabase, Cloudflare Workers, Git' },
    { label: 'AI', items: 'Conversational and agent interfaces, MCP servers, LLM pipelines, Claude Code, Codex' },
  ],
  languages: 'Spanish (native), English (professional working proficiency)',
};

/** Plain-text version for llms.txt and anything else that reads text. */
export function resumeText() {
  const r = resume;
  return [
    `## Résumé`,
    '',
    `${r.name}, ${r.headline}. ${r.location}. ${r.email}`,
    '',
    r.summary,
    '',
    '### Experience',
    ...r.experience.flatMap((e) => [
      `- ${e.title}, ${e.company} (${e.start} – ${e.end})`,
      ...e.bullets.map((b) => `  - ${b}`),
    ]),
    '',
    '### Projects',
    ...r.projects.map((p) => `- [${p.name}](${p.href}): ${p.text}`),
    '',
    '### Skills',
    ...r.skills.map((s) => `- ${s.label}: ${s.items}`),
    '',
    `### Languages`,
    r.languages,
    '',
    `PDF: ${site.url}${resumePdf}`,
  ].join('\n');
}
