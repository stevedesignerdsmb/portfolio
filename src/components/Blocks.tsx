import Link from 'next/link';
import { IconArrowRight, IconArrowUpRight } from '@/components/Icons';
import type { Project } from '@/content/site';
import { Frame, Logo, MediaTK, PhoneTrio, Shot, StatusPill } from './Media';
import { Rich } from './Rich';
import { FinaScene } from './FinaScene';
import { SmbCover } from './SmbCover';
import { cn } from '@/lib/utils';

/** Content column padding, shared by every page. */
export function Pad({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-5 sm:px-10 lg:px-12', className)}>{children}</div>;
}

/**
 * A section under a full-width hairline. By default the title sits above the
 * content; `side` puts it in its own narrow column (case studies), so every
 * paragraph starts on the same vertical line.
 */
export function Section({
  title,
  aside,
  id,
  side,
  children,
  className,
}: {
  title?: string;
  aside?: React.ReactNode;
  id?: string;
  side?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('rule scroll-mt-24 py-10 lg:py-12', className)} data-toc={id ? title : undefined}>
      <Pad>
        {side && title ? (
          <div className="grid gap-3 md:grid-cols-[148px_minmax(0,1fr)] md:gap-8">
            <h2 className="label">{title}</h2>
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          <>
            {title ? (
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 className="label">{title}</h2>
                {aside}
              </div>
            ) : null}
            {children}
          </>
        )}
      </Pad>
    </section>
  );
}

export function MoreLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const Icon = external ? IconArrowUpRight : IconArrowRight;
  const cls =
    'group inline-flex items-center gap-1 text-[13px] text-fg-3 transition-colors duration-200 hover:text-fg';
  const inner = (
    <>
      {children}
      <Icon size={13} aria-hidden className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = 'primary',
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}) {
  // Hover answers in ~150ms: fill shifts, the icon nudges; press settles to 0.97.
  const cls = cn(
    'group/btn inline-flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[14px] font-medium',
    'transition-[background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.97]',
    '[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out-quart',
    variant === 'primary'
      ? 'bg-primary text-primary-fg shadow-primary hover:bg-primary-hover hover:[&_svg]:translate-x-0.5'
      : 'bg-surface text-fg shadow-button hover:bg-surface-2',
  );
  return external || href.startsWith('mailto:') ? (
    <a href={href} target={external ? '_blank' : undefined} rel="noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * Index card: just the picture, with the company and the feature the case
 * study is about set inside it. No logo row, no dates: the logos already sit
 * under "Where I've worked".
 */
export function WorkCard({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} data-cuelume-tap="" className="group relative block">
      {p.coverScene === 'smb' ? (
        <SmbCover />
      ) : p.scene === 'fina' ? (
        <FinaScene still />
      ) : p.screens ? (
        <PhoneTrio screens={p.screens} alt={p.title} interactive />
      ) : p.cover ? (
        <Frame interactive className={p.coverRatio ? undefined : 'aspect-[16/10]'}>
          {p.coverRatio ? <div style={{ aspectRatio: p.coverRatio }} /> : null}
          <Shot src={p.cover} alt={`${p.title} cover`} className={p.coverRatio ? 'absolute inset-0' : undefined} />
        </Frame>
      ) : (
        <MediaTK label={p.coverLabel ?? 'Project cover · 16:10'} />
      )}
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-[13px] leading-none shadow-[0_0_0_1px_var(--line),0_2px_8px_-2px_rgb(0_0_0/0.12)] backdrop-blur-sm">
        <span className="font-medium text-fg">{p.title}</span>
        <span className="text-fg-3">
          <Rich text={p.feature ?? p.tagline} />
        </span>
      </span>
    </Link>
  );
}

/** Project entry: header row (logo · name · year) over a large framed cover. */
export function ProjectEntry({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} data-cuelume-tap="" className="group block">
      <div className="mb-3.5 flex items-center gap-3">
        <Logo src={p.logo} fill={p.logoFill} monogram={p.monogram} name={p.title} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium leading-[22px] text-fg">
            {p.title}
            {p.kind === 'work' && p.company !== p.title ? <span className="font-normal text-fg-3"> · {p.company}</span> : null}
          </p>
          <p className="truncate text-[13px] leading-[18px] text-fg-3">
            <Rich text={p.tagline} />
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <StatusPill status={p.status} />
          <span className="tabular text-[13px] text-fg-3">
            <Rich text={p.year} />
          </span>
        </div>
      </div>
      {p.coverScene === 'smb' ? (
        <SmbCover />
      ) : p.scene === 'fina' ? (
        <FinaScene still />
      ) : p.screens ? (
        <PhoneTrio screens={p.screens} alt={p.title} interactive />
      ) : p.cover ? (
        <Frame interactive className={p.coverRatio ? undefined : 'aspect-[16/10]'}>
          {p.coverRatio ? <div style={{ aspectRatio: p.coverRatio }} /> : null}
          <Shot src={p.cover} alt={`${p.title} cover`} className={p.coverRatio ? 'absolute inset-0' : undefined} />
        </Frame>
      ) : (
        <MediaTK label={p.coverLabel ?? 'Project cover · 16:10'} />
      )}
    </Link>
  );
}
