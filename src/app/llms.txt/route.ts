import { career, clients, products, projects, site } from '@/content/site';

export const dynamic = 'force-static';

/** Drop anything still marked [[placeholder]] so assistants never repeat unconfirmed facts. */
const clean = (s: string) => (s.includes('[[') ? '' : s);
const lines = (xs: (string | false | undefined)[]) => xs.filter((x) => typeof x === 'string').join('\n');
const desc = (s: string) => (clean(s) ? `: ${s}` : '');

export function GET() {
  const body = lines([
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a ${site.role.toLowerCase()} based in ${site.location}, Mexico, ${site.availability.toLowerCase()}.`,
    `Contact: ${site.email}`,
    '',
    '## Experience',
    ...career.map((c) => `- ${c.company}${clean(c.role) ? `, ${c.role}` : ''}${clean(c.years) ? ` (${c.years})` : ''}${c.slug ? `: ${site.url}/work/${c.slug}` : ''}`),
    '',
    '## Case studies',
    ...projects.map((p) => `- [${p.title}](${site.url}/work/${p.slug})${desc(p.tagline)}`),
    '',
    '## Own products',
    ...products.map((p) => `- [${p.title}](${p.slug ? `${site.url}/work/${p.slug}` : p.url})${desc(p.tagline)}`),
    '',
    '## Freelance clients',
    clients.map((c) => c.name).join(', '),
    '',
    '## Links',
    `- [About](${site.url}/about)`,
    `- [Playground](${site.url}/playground)`,
    `- [LinkedIn](${site.linkedin})`,
    `- [Résumé](${site.resume})`,
    '',
  ]);
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
