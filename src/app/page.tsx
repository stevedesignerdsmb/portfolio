import { projects, site, testimonials, workplaces } from '@/content/site';
import { Pad, Section, WorkCard } from '@/components/Blocks';
import { Greeting } from '@/components/Greeting';
import { Testimonials } from '@/components/Testimonials';
import { TextLink } from '@/components/TextLink';
import { Workplaces } from '@/components/Workplaces';
import { ContactButtons } from '@/components/ContactButtons';

/**
 * Index, after kevdu.co: who I am, where I've worked, how to reach me, then
 * the work itself. Every card under "Selected work" is a case study, so
 * nothing on this page leaves you guessing where a click goes.
 */
export default function Home() {
  return (
    <>
      <Pad className="pb-12 pt-14">
        <Greeting />
        <div className="mt-4 leading-[22px]">
          <h1 className="text-[16px] font-medium text-fg">{site.name}</h1>
          <p className="text-[16px] text-fg-3">{site.role}</p>
        </div>

        <div className="mt-5 space-y-4 text-[14px] leading-5 text-fg">
          <p>I design product interfaces and build them in code. Lately that means AI agents: what they say, what they show while they work, and the screens around them.</p>
          <p>
            Right now I’m a design engineer at <TextLink href="https://kiiex.io">Kiiex</TextLink>, working on cross-border
            payments and trading. Before that, <TextLink href="https://smb.co">SMB.co</TextLink> and{' '}
            <TextLink href="https://www.mercadolibre.com">Mercado Libre</TextLink>.
          </p>
        </div>

        <div className="mt-8">
          <Workplaces items={workplaces} />
        </div>

        <ContactButtons className="mt-8" />
      </Pad>

      <Section title="Selected work">
        <div className="space-y-6">
          {projects.map((p) => (
            <WorkCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      <Section title="Kind words">
        <Testimonials items={testimonials} />
      </Section>
    </>
  );
}
