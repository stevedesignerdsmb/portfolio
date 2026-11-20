import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/content/site';
import { Pad, Section } from '@/components/Blocks';
import { IconArrowRight } from '@/components/Icons';
import { Frame, Logo, MediaTK, PhoneTrio, Shot } from '@/components/Media';
import { FinaScene } from '@/components/FinaScene';

export const metadata: Metadata = { title: 'Projects' };

/**
 * Own products, laid out like wireframe.co/projects: name and link, a large
 * picture, a short paragraph. Each entry is complete on its own; the link
 * opens the product itself.
 */
export default function ProjectsPage() {
  return (
    <>
      <Pad className="pb-12 pt-10 lg:pt-14">
        <h1 className="text-[24px] font-medium tracking-[-0.025em]">Projects</h1>
        <p className="mt-2 text-[15px] leading-6 text-fg-2">
          Products I design and build on my own, end to end.
        </p>
      </Pad>
      {products.map((p) => (
        <Section key={p.key}>
          <article>
            <div className="mb-3.5 flex items-center gap-3">
              <Logo src={p.logo} fill name={p.title} />
              <p className="min-w-0 flex-1 truncate text-[15px] leading-[22px]">
                <span className="font-medium text-fg">{p.title}</span>
                <span className="text-fg-3">: {p.tagline}</span>
              </p>
              <a href={p.url} target="_blank" rel="noreferrer" className="basic-link shrink-0 text-[13px] text-fg-3">
                {p.urlLabel}
              </a>
            </div>
            {p.scene === 'fina' ? (
              <FinaScene still />
            ) : p.screens ? (
              <PhoneTrio screens={p.screens} alt={p.title} />
            ) : p.cover ? (
              <Frame className={p.coverRatio ? undefined : 'aspect-[16/10]'}>
                {p.coverRatio ? <div style={{ aspectRatio: p.coverRatio }} /> : null}
                <Shot src={p.cover} alt={`${p.title}: leaderboard, home and speaking practice`} className={p.coverRatio ? 'absolute inset-0' : undefined} />
              </Frame>
            ) : (
              <MediaTK label={`${p.title} screens · 16:10`} />
            )}
            <p className="mt-5 text-[15px] leading-6 text-fg">{p.about}</p>
            {p.slug ? (
              <Link
                href={`/work/${p.slug}`}
                className="group mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-fg"
              >
                Read the case study
                <IconArrowRight size={13} className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </article>
        </Section>
      ))}
    </>
  );
}
