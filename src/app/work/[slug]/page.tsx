import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IconArrowRight } from '@/components/Icons';
import { BackLink } from '@/components/Shell';
import { projects, type Project } from '@/content/site';
import { Pad } from '@/components/Blocks';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Frame, Logo, MediaTK, PhoneTrio, PhoneWell, Shot } from '@/components/Media';
import { Rich, isTK } from '@/components/Rich';
import { Loop } from '@/components/Loop';
import { Screen } from '@/components/Screen';
import { CaseView } from '@/components/CaseView';
import { FinaScene } from '@/components/FinaScene';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return { title: 'Not found' };
  return { title: p.title, description: isTK(p.tagline) ? undefined : p.tagline };
}

/*
 * Type on this page uses only what the index already uses:
 *   16/22 medium + 16/22 fg-3  title and line under it (index name and role)
 *   14/20 fg                   body, list items, values (index description)
 *   14/20 medium               decision titles
 *   .label 13/20 fg-3          section titles and meta labels (index "Selected work")
 */
const prose = 'space-y-4 text-[14px] leading-5 text-fg';

/** Section title, styled like the index's; the sidebar tree picks it up. */
function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} data-toc={children} data-toc-level="1" className="mb-3 mt-12 scroll-mt-10 text-[15px] font-semibold leading-6 tracking-[-0.01em] text-fg">
      {children}
    </h2>
  );
}

/**
 * One well for every picture: a quiet grey stage with room on every side, and
 * the screen inset in it at its own proportions, so it breathes.
 */
function Well({ children, caption, tight }: { children: React.ReactNode; caption?: string; tight?: boolean }) {
  return (
    <figure className="my-8">
      <div className={tight ? 'case-well case-well-tight' : 'case-well'}>
        <div className="case-media">{children}</div>
      </div>
      {caption ? <figcaption className="label mt-3">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * A square recording from the product. It brings its own backdrop, so it gets
 * no grey well, only the radius and hairline every picture here has.
 */
function Square({ src, poster, label }: { src: string; poster: string; label: string }) {
  return (
    <div className="case-square">
      <Loop src={src} poster={poster} ratio="1 / 1" label={label} />
    </div>
  );
}

function Hero({ p }: { p: Project }) {
  if (p.scene === 'fina')
    return (
      <div className="my-8">
        <FinaScene />
      </div>
    );
  if (p.heroLoops?.length)
    return (
      <div className="my-8 grid grid-cols-2 gap-3">
        {p.heroLoops.map((v) => (
          <Square key={v.src} {...v} />
        ))}
      </div>
    );
  if (p.heroTK)
    return (
      <div className="my-8">
        <MediaTK label={p.heroTK} kind="video" />
      </div>
    );
  if (p.video)
    return (
      <Well tight>
        <Loop src={p.video.src} poster={p.video.poster} ratio={p.video.ratio} label={p.video.label} />
      </Well>
    );
  if (p.screens)
    return (
      <div className="my-8">
        <PhoneTrio screens={p.screens} alt={p.title} />
      </div>
    );
  if (p.cover)
    return (
      <div className="my-8">
        <Frame className={p.coverRatio ? undefined : 'aspect-[16/10]'}>
          {p.coverRatio ? <div style={{ aspectRatio: p.coverRatio }} /> : null}
          <Shot src={p.cover} alt={`${p.title}, overview`} className={p.coverRatio ? 'absolute inset-0' : undefined} />
        </Frame>
      </div>
    );
  return (
    <div className="my-8">
      <MediaTK label={p.coverLabel ?? 'Cover · 16:10'} />
    </div>
  );
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const meta = p.meta.filter((m) => m.label !== 'Company' && m.label !== 'Platform');

  return (
    <article className="pb-16 pt-14">
      <Pad>
        {/* On desktop the sidebar carries the way back. */}
        <BackLink className="mb-8 lg:hidden" />

        <header id="overview" data-toc="Overview" data-toc-level="1" className="scroll-mt-10">
          {/* The demo sits on the logo's row: the one action on the page, at the top. */}
          <div className="flex items-center justify-between gap-4">
            <Logo src={p.logo} fill={p.logoFill} monogram={p.monogram} name={p.title} size={40} />
            {p.demo ? (
              <a href={p.demo} target="_blank" rel="noreferrer" className="case-play inline-flex h-8 shrink-0 items-center gap-2 rounded-full pl-2.5 pr-3.5 text-[14px] font-medium leading-5">
                <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M5 3.3v9.4c0 .6.7 1 1.2.6l7-4.7a.75.75 0 0 0 0-1.2l-7-4.7C5.7 2.3 5 2.7 5 3.3Z" />
                </svg>
                Play the demo
              </a>
            ) : p.website ? (
              <a href={p.website} target="_blank" rel="noreferrer" className="case-play inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full pl-3.5 pr-3 text-[14px] font-medium leading-5">
                {p.websiteLabel ?? 'Visit website'}
                <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.5 10.5l5-5M6.5 5.5h4v4" />
                </svg>
              </a>
            ) : null}
          </div>
          <div className="mt-5 leading-[22px]">
            <h1 className="text-[16px] font-medium text-fg">{p.title}</h1>
            <p className="text-[16px] text-fg-3">
              <Rich text={p.feature ?? p.tagline} />
            </p>
          </div>

          {/* Two aligned columns on phones; one row with equal gaps on wider screens. */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-10">
            {meta.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dt className="label">{m.label}</dt>
                <dd className="text-[14px] leading-5 text-fg">
                  <Rich text={m.value} />
                </dd>
              </div>
            ))}
            {p.channels ? (
              <div>
                <dt className="label">Lives in</dt>
                {/* Logos only, so the row stays one line; the brands read on their own. */}
                <dd className="flex h-5 items-center gap-2" aria-label={p.channels.map((c) => c.name).join(', ')}>
                  {p.channels.map((c) => (
                    <span key={c.name} title={c.name}>
                      <Logo src={c.logo} fill name={c.name} size={18} />
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </header>

        <CaseView
          hero={<Hero p={p} />}
          tldr={
            p.tldr ? (
              <section id="tldr" data-toc="TL;DR" data-toc-level="1" className="scroll-mt-10">
                <div className={`${prose} mt-8`}>
                  <p>
                    <Rich text={p.tldr.lede} />
                  </p>
                </div>
                <dl className="mt-8 space-y-4">
                  {p.tldr.points.map((pt) => (
                    <div key={pt.label} className="grid gap-1 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-6">
                      <dt className="label">{pt.label}</dt>
                      <dd className="text-[14px] leading-5 text-fg">
                        <Rich text={pt.text} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : (
              <div className={`${prose} mt-8`}>
                {p.summary.map((t, k) => (
                  <p key={k}>
                    <Rich text={t} />
                  </p>
                ))}
              </div>
            )
          }
          detailed={
            <>


        <div className={`${prose} mt-8`}>
          {p.summary.map((t, k) => (
            <p key={k}>
              <Rich text={t} />
            </p>
          ))}
        </div>

        <H2 id="problem">The problem</H2>
        <div className={prose}>
          <p>
            <Rich text={p.problem} />
          </p>
        </div>

        <H2 id="built">What I built</H2>
        <ul className="space-y-2 text-[14px] leading-5 text-fg">
          {p.owned.map((o, k) => (
            <li key={k} className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-fg-3" />
              <span>
                <Rich text={o} />
              </span>
            </li>
          ))}
        </ul>
        {p.ownedShot ? (
          <Well caption={p.ownedShot.alt}>
            <Screen src={p.ownedShot.src} alt={p.ownedShot.alt} ratio={p.ownedShot.ratio} />
          </Well>
        ) : null}

        <H2 id="decisions">Decisions</H2>
        {p.decisions.map((d, k) => (
          <section key={k} className={k ? 'mt-10' : undefined}>
            <h3 id={`decision-${k + 1}`} data-toc={d.title} data-toc-level="2" className="scroll-mt-10 text-[14px] font-semibold leading-5 text-fg">
              <Rich text={d.title} />
            </h3>
            <div className={`${prose} mt-1.5`}>
              <p>
                <Rich text={d.body} />
              </p>
            </div>
            {d.media?.kind === 'shot' && d.media.bare ? (
              <figure className="my-8">
                <div className="case-square">
                  <Screen src={d.media.src} alt={d.media.alt} ratio={d.media.ratio} />
                </div>
                <figcaption className="label mt-3">{d.media.alt}</figcaption>
              </figure>
            ) : d.media?.kind === 'shot' ? (
              <Well caption={d.media.alt}>
                <Screen src={d.media.src} alt={d.media.alt} ratio={d.media.ratio} highlights={d.media.highlights} />
              </Well>
            ) : d.media?.kind === 'loop' ? (
              <figure className="my-8">
                <Square src={d.media.src} poster={d.media.poster} label={d.media.alt} />
                <figcaption className="label mt-3">{d.media.alt}</figcaption>
              </figure>
            ) : d.media?.kind === 'image' ? (
              <div className="my-8">
                <PhoneWell src={d.media.src} alt={`${p.title}: decision ${k + 1}`} />
              </div>
            ) : d.media ? (
              <div className="my-8">
                <MediaTK label={d.media.label} kind={d.media.kind === 'video' ? 'video' : 'image'} />
              </div>
            ) : null}
          </section>
        ))}

        {p.beforeAfter ? (
          <>
            <H2 id="before-after">Before and after</H2>
            <BeforeAfter before={p.beforeAfter.before} after={p.beforeAfter.after} label={p.title} />
          </>
        ) : null}

        <H2 id="outcome">Outcome</H2>
        {p.outcomeText ? (
          <>
          <div className={prose}>
            {p.outcomeText.map((t, k) => (
              <p key={k}>
                <Rich text={t} />
              </p>
            ))}
          </div>
          </>
        ) : (
          <>
            <dl className="grid grid-cols-3 gap-6">
              {p.outcomes.map((o, k) => (
                <div key={k}>
                  <dt className="label">
                    <Rich text={o.label} />
                  </dt>
                  <dd className="text-[14px] leading-5 text-fg">
                    <Rich text={o.value} />
                  </dd>
                </div>
              ))}
            </dl>
            {p.reflection ? (
              <div className={`${prose} mt-6`}>
                <p>
                  <Rich text={p.reflection} />
                </p>
              </div>
            ) : null}
          </>
        )}

            </>
          }
        />

        <Link href={`/work/${next.slug}`} className="group mt-16 flex items-center justify-between gap-4 border-t border-line pt-6">
          <span className="flex items-center gap-3">
            <Logo src={next.logo} fill={next.logoFill} monogram={next.monogram} name={next.title} />
            <span>
              <span className="label block">Next project</span>
              <span className="block text-[14px] font-medium leading-5 text-fg">{next.title}</span>
            </span>
          </span>
          <IconArrowRight size={16} aria-hidden className="text-fg-3 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-fg" />
        </Link>
      </Pad>
    </article>
  );
}
