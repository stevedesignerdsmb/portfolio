'use client';

import { useCallback, useEffect, useState } from 'react';
import type { testimonials as T } from '@/content/site';
import { cn } from '@/lib/utils';

type Item = (typeof T)[number];
const DWELL = 8000;

/** Brand light: soft diagonal beams in the client's colour. */
function Beams({ glow }: { glow: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute -right-[20%] -top-[60%] h-[160%] w-[90%] rotate-[28deg] blur-[2px]"
        style={{
          background: `repeating-linear-gradient(90deg, transparent 0 18px, ${glow}40 18px 20px, transparent 20px 46px)`,
          maskImage: 'radial-gradient(60% 55% at 60% 45%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(60% 55% at 60% 45%, #000 20%, transparent 75%)',
        }}
      />
      <div
        className="absolute -right-[10%] -top-[30%] h-[110%] w-[70%] rounded-full blur-[60px]"
        style={{ background: `radial-gradient(closest-side, ${glow}66, transparent)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
    </div>
  );
}

function Content({ t }: { t: Item }) {
  return (
    <div className="relative flex h-full flex-col justify-end gap-8 p-6 sm:p-8">
      <blockquote className="max-w-[40ch] text-[17px] font-medium leading-[26px] tracking-[-0.012em] text-pretty">
        “{t.quote}”
      </blockquote>
      <figcaption className="flex flex-col items-start gap-3 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {t.brand.wordmark ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.brand.wordmark} alt={t.company} className="h-[18px] w-auto" />
        ) : (
          <span className="text-[15px] font-semibold tracking-[-0.02em]">{t.company}</span>
        )}
        <span className="flex items-center gap-2 whitespace-nowrap text-[13px] text-white/75">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.avatar} alt="" className="size-6 rounded-full object-cover ring-1 ring-white/20" />
          <span>
            <span className="font-medium text-white">{t.name}</span>, {t.role}
          </span>
        </span>
      </figcaption>
    </div>
  );
}

function Slide({ t, className, onAnimationEnd }: { t: Item; className?: string; onAnimationEnd?: () => void }) {
  return (
    <div
      className={cn('absolute inset-0 overflow-hidden rounded-[14px]', className)}
      style={{ backgroundColor: t.brand.bg }}
      onAnimationEnd={onAnimationEnd}
    >
      <Beams glow={t.brand.glow} />
      <Content t={t} />
    </div>
  );
}

/**
 * Quote card in the client's brand, as on wireframe.co: the next card sweeps
 * in over the current one behind a soft diagonal mask while it sharpens from
 * a blur. Click to move on; it pauses while hovered.
 */
export function Testimonials({ items }: { items: Item[] }) {
  const [base, setBase] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const many = items.length > 1;

  const next = useCallback(() => {
    setIncoming((cur) => (cur === null ? (base + 1) % items.length : cur));
  }, [base, items.length]);

  useEffect(() => {
    if (paused || !many || incoming !== null) return;
    const id = window.setTimeout(next, DWELL);
    return () => window.clearTimeout(id);
  }, [base, paused, many, incoming, next]);

  return (
    <figure
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onClick={many ? next : undefined}
      aria-roledescription="carousel"
      aria-label="What people say"
      className={cn('relative grid text-white', many && 'cursor-pointer')}
    >
      {/* Invisible copies reserve the tallest quote's height so the card never jumps. */}
      {items.map((t) => (
        <div key={t.name} aria-hidden className="invisible [grid-area:1/1]">
          <Content t={t} />
        </div>
      ))}
      <div className="absolute inset-0" aria-live="polite">
        <Slide t={items[base]} />
        {incoming !== null ? (
          <Slide
            key={incoming}
            t={items[incoming]}
            className="testi-wipe"
            onAnimationEnd={() => {
              setBase(incoming);
              setIncoming(null);
            }}
          />
        ) : null}
      </div>
    </figure>
  );
}
