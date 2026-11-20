import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Pad, Section } from '@/components/Blocks';
import { AboutCollage } from '@/components/AboutCollage';
import { TextLink } from '@/components/TextLink';
import { ContactButtons } from '@/components/ContactButtons';

export const metadata: Metadata = { title: 'About' };

const principles = [
  {
    title: 'Decide in code',
    body: 'I sketch in Figma, then make the real decisions in code, where I can feel the motion, see what real data does to a layout and run into the edge cases I missed.',
  },
  {
    title: 'Launch narrow',
    body: 'I put a small version in front of people early and let how they use it decide what comes next, instead of polishing a big one nobody has touched.',
  },
  {
    title: 'How I use AI',
    body: 'I work with Claude Code and Codex every day. I write the brief, read every diff and throw away more than I keep. What the product should do is still my call.',
  },
];

const admired = [
  { name: 'Linear', detail: 'keyboard-first speed', logo: '/logos/admire/linear.png', href: 'https://linear.app' },
  { name: 'Ramp', detail: 'dense, calm tables', logo: '/logos/admire/ramp.png', href: 'https://ramp.com' },
  { name: 'Granola', detail: 'first five minutes', logo: '/logos/admire/granola.png', href: 'https://granola.ai' },
];

export default function About() {
  return (
    <>
      <Pad className="pb-10 pt-10 lg:pt-14">
        <h1 className="text-[26px] font-medium leading-[1.15] tracking-[-0.028em] sm:text-[30px]">
          I design interfaces, then build them.
        </h1>
        <div className="mt-5 space-y-4 text-[14px] leading-5 text-fg">
          <p>
            I’m Steve, a design engineer born in Bogotá and based in {site.location}. I’ve spent 6 years designing
            products in e-commerce, fintech and AI, at <TextLink href="https://www.mercadolibre.com">Mercado Libre</TextLink>{' '}
            and at early-stage startups working directly with founders.
          </p>
          <p>
            I started on interfaces and kept wanting to build them myself. No-code tools like{' '}
            <TextLink href="https://www.weweb.io">WeWeb</TextLink> taught me logic, components and data modeling;{' '}
            <TextLink href="https://www.claude.com/product/claude-code">Claude Code</TextLink> and{' '}
            <TextLink href="https://openai.com/codex">Codex</TextLink> took me the rest of the way. Now most of what I
            design, I also build, including my own products, <TextLink href="/work/fina">Fina</TextLink> and{' '}
            <TextLink href="https://apps.apple.com/us/app/curio-learn-anything/id6808692712">Curio</TextLink>.
          </p>
          <p>
            Next, I want to join a team that moves fast, builds with AI every day and makes products I’d want to
            use myself.
          </p>
        </div>
        <ContactButtons className="mt-6" />
      </Pad>

      <div className="overflow-hidden pb-12 pt-2">
        <AboutCollage />
      </div>

      <Section id="how-i-work" title="How I work">
        <div className="space-y-6">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="text-[15px] font-medium leading-[22px]">{p.title}</h3>
              <p className="mt-1 text-[14px] leading-5 text-fg-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="admire" title="Products I admire">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] leading-5 text-fg-2">
          {admired.map((a) => (
            <li key={a.name} className="flex items-center gap-1 whitespace-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.logo} alt="" width={20} height={20} className="size-4 rounded-[4px]" />
              <span>
                <a href={a.href} target="_blank" rel="noreferrer" className="text-fg">{a.name}</a>’s {a.detail}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
