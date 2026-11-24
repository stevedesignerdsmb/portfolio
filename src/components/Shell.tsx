'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { site, shots } from '@/content/site';
import { ThemeSwitch } from './ThemeSwitch';
import { SoundToggle } from './Sound';
import { ResumeLink, ResumeProvider } from './ResumeDialog';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: 'Index' },
  { href: '/projects', label: 'Projects' },
  { href: '/playground', label: 'Playground', count: shots.length },
  { href: '/about', label: 'About' },
];

const active = (path: string, href: string) => (href === '/' ? path === '/' : path.startsWith(href));

/**
 * Home mark, in the spirit of benji.org's bunny (two glyphs and a face):
 * a pair of code braces around a small face, design engineer in five
 * characters. It blinks now and then; on hover the braces open up and it winks.
 */
function BraceFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" width={40} height={20} aria-hidden fill="none" className={cn('braceface overflow-visible', className)}>
      <text className="bf-l" x="4" y="15.5" fontSize="17" fontWeight="400" fill="var(--fg-4)" style={{ fontFamily: 'var(--font-inter)' }}>
        {'{'}
      </text>
      <text className="bf-r" x="36" y="15.5" fontSize="17" fontWeight="400" fill="var(--fg-4)" textAnchor="end" style={{ fontFamily: 'var(--font-inter)' }}>
        {'}'}
      </text>
      <g fill="var(--fg)">
        <ellipse className="bf-eye" cx="15.5" cy="8.6" rx="1.5" ry="1.7" />
        <ellipse className="bf-eye bf-eye-r" cx="24.5" cy="8.6" rx="1.5" ry="1.7" />
      </g>
      <path className="bf-wink" d="M22.8 8.8 Q24.5 7.4 26.2 8.8" stroke="var(--fg)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M16.4 12.6 Q20 15.4 23.6 12.6" stroke="var(--fg)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Mark({ withName }: { withName?: boolean }) {
  return (
    <Link href="/" data-cuelume-tap="" aria-label={`${site.name}, home`} className="group/mark inline-flex items-center gap-2.5 text-fg">
      <BraceFace />
      {withName ? <span className="text-[14px] font-medium tracking-[-0.01em]">{site.name}</span> : null}
    </Link>
  );
}

/** Label over value, flush left, same as "Get in touch" below it. */
function Availability() {
  return (
    <div className="space-y-0.5 text-[13px] leading-5">
      <p className="label flex items-center gap-1.5">
        Availability
        {/* A plain status mark: still, so it reads as a fact, not an alert. */}
        <span aria-hidden className="size-1.5 rounded-full bg-ok" />
      </p>
      <p className="text-fg">{site.availability}</p>
    </div>
  );
}

/** benji.org's back link: a return arrow and the word, grey until hovered. */
export function BackLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      data-cuelume-tap=""
      className={cn('group inline-flex items-center gap-1 py-1 text-[14px] font-[460] leading-5 tracking-[-0.006em] text-fg-3 transition-colors duration-100 hover:text-fg', className)}
    >
      <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 ease-out-quart group-hover:-translate-x-0.5">
        <path d="M5.5 4 1.5 8m0 0 4 4m-4-4H10a2.5 2.5 0 0 0 0-5H8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Index
    </Link>
  );
}

type Entry = { id: string; label: string; level: number };

/**
 * Inside a case study the sidebar trades the site nav for the way back and a
 * tree of the page, after benji.org: fewer places to go, one thing to read.
 * The section in view is marked with a hairline. A TL;DR is short enough to
 * need no map, so the tree only shows with the detailed read; when the
 * visitor switches to it, the rows cascade in (see .toc-enter).
 */
function Contents({ path }: { path: string }) {
  const [items, setItems] = useState<Entry[]>([]);
  /** False while a case study is on its TL;DR. */
  const [show, setShow] = useState(true);
  /** Animate only when the visitor switched reads, never on first paint. */
  const [enter, setEnter] = useState(false);
  const [on, setOn] = useState<string | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const [mark, setMark] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    // Only what's showing: a case study can hide its detailed read behind a tab.
    let els: HTMLElement[] = [];
    const scan = () => {
      els = [...document.querySelectorAll<HTMLElement>('main [data-toc]')].filter((e) => !e.closest('[hidden]'));
      setItems(els.map((e) => ({ id: e.id, label: e.dataset.toc ?? '', level: Number(e.dataset.tocLevel ?? 1) })));
      setShow(!document.querySelector('main #panel-detailed[hidden]'));
      pick();
    };
    const pick = () => {
      // The last heading that has passed the top third of the window.
      let cur = els[0]?.id ?? null;
      for (const e of els) if (e.getBoundingClientRect().top < window.innerHeight * 0.33) cur = e.id;
      // The last sections can't scroll up to the top third, so at the end of
      // the page the last one wins.
      const end = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (end && els.length) cur = els[els.length - 1].id;
      setOn(cur);
    };
    const switched = (e: Event) => {
      setEnter((e as CustomEvent<string>).detail === 'user');
      scan();
    };
    scan();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('caseview', switched);
    return () => {
      window.removeEventListener('scroll', pick);
      window.removeEventListener('caseview', switched);
    };
  }, [path]);

  // One marker that slides along the track to the item in view.
  useLayoutEffect(() => {
    const a = list.current?.querySelector<HTMLElement>(`a[href="#${on}"]`);
    setMark(a ? { top: a.offsetTop, height: a.offsetHeight } : null);
  }, [on, items, show]);

  return (
    <nav aria-label="On this page" className="side-swap mt-10">
      <BackLink />
      {show && items.length ? (
        <ul ref={list} className={cn('relative mt-8 space-y-2', enter && 'toc-enter')}>
          {/* Track and marker share one x, so the marker sits exactly on the line. */}
          <span aria-hidden className="toc-track absolute inset-y-0 left-0 w-px bg-line" />
          {mark ? (
            <span
              aria-hidden
              className="toc-track absolute left-0 top-0 w-px bg-fg transition-[transform,height] duration-200 ease-out-quart motion-reduce:transition-none"
              style={{ height: mark.height, transform: `translateY(${mark.top}px)` }}
            />
          ) : null}
          {items.map((it, i) => (
            <li key={it.id} style={{ '--i': Math.min(i, 10) } as React.CSSProperties}>
              <a
                href={`#${it.id}`}
                data-cuelume-select=""
                data-cuelume-emphasis="subtle"
                aria-current={on === it.id ? 'location' : undefined}
                onClick={() => setOn(it.id)}
                style={{ paddingLeft: 12 + (it.level - 1) * 12 }}
                className={cn(
                  'block text-pretty text-[13px] font-[460] leading-[16px] tracking-[-0.003em] transition-colors duration-150',
                  on === it.id ? 'text-fg' : 'text-fg-3 hover:text-fg',
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

function Sidebar() {
  const path = usePathname();
  const reading = /^\/work\/[^/]+/.test(path);
  return (
    <aside className="sticky top-0 hidden h-dvh flex-col justify-between px-6 pb-8 pt-14 lg:flex">
      <div>
        <Mark />
        {reading ? <Contents key={path} path={path} /> : (
        <nav aria-label="Primary" className="side-swap mt-10">
          <ul className="space-y-0.5">
            {nav.map((n) => {
              const on = active(path, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    data-cuelume-tap=""
                    aria-current={on ? 'page' : undefined}
                    className={cn(
                      '-mx-2 flex items-center justify-between rounded-[7px] px-2 py-1 text-[14px] transition-colors duration-150',
                      on ? 'bg-surface-2 text-fg' : 'text-fg-3 hover:text-fg',
                    )}
                  >
                    {n.label}
                    {n.count ? <span className="tabular text-[12px] text-fg-4">{n.count}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        )}
      </div>
      <div className="space-y-6">
        <Availability />
        <div className="space-y-0.5 text-[13px] leading-5">
          <p className="label">Get in touch</p>
          <a href={`mailto:${site.email}`} className="basic-link truncate" title={site.email}>
            {site.email}
          </a>
        </div>
        <div className="space-y-0.5 text-[13px] leading-5">
          <p className="label">Elsewhere</p>
          <p className="flex gap-3">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="basic-link">LinkedIn</a>
            <ResumeLink className="basic-link" />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <SoundToggle />
        </div>
        <p className="text-[11px] text-fg-4">
          Updated <span className="tabular">{site.updated}</span>
        </p>
      </div>
    </aside>
  );
}

function MobileHeader() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-md lg:hidden">
      <div className="flex h-12 items-center px-5 sm:px-10">
        <Mark withName />
      </div>
      <nav aria-label="Primary" className="px-5 sm:px-10">
        <ul className="flex gap-5">
          {nav.map((n) => {
            const on = active(path, n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  data-cuelume-tap=""
                  aria-current={on ? 'page' : undefined}
                  className={cn(
                    'relative block whitespace-nowrap pb-2.5 pt-0.5 text-[14px] transition-colors duration-200',
                    'after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-fg after:transition-opacity after:duration-200',
                    on ? 'text-fg after:opacity-100' : 'text-fg-3 after:opacity-0 hover:text-fg',
                  )}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function MobileFooter() {
  return (
    <footer className="space-y-5 border-t border-line px-5 py-8 lg:hidden">
      <Availability />
      {/* Links and the theme switch share one row, centred on each other */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
          <a href={`mailto:${site.email}`} className="basic-link">Email</a>
          <a href={site.x} className="basic-link">X</a>
          <a href={site.linkedin} className="basic-link">LinkedIn</a>
          <ResumeLink className="basic-link" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <SoundToggle />
        </div>
      </div>
    </footer>
  );
}

/**
 * Two columns divided by a hairline: navigation on the left, the page on the
 * right. The page itself is the surface, so on wide screens nothing floats;
 * the lines run the full height of the window and the columns stay centred.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
    <div className="relative min-h-dvh">
      <div className="relative mx-auto min-h-dvh max-w-[952px] lg:border-x lg:border-line">
        <MobileHeader />
        <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
          <Sidebar />
          <main id="main" className="min-w-0 lg:border-l lg:border-line">
            {children}
          </main>
        </div>
        <MobileFooter />
      </div>
    </div>
    </ResumeProvider>
  );
}
