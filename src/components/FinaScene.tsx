'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import GradientASCII from './vendor/GradientASCII';
import { cn } from '@/lib/utils';

/**
 * Fina as a conveyor: raw bank notifications drift down, cross a band of green
 * ASCII light where Fina reads them, and come out the other side as logged
 * purchases. Copies of a purchase that already came in (the same charge as a
 * push and as an email) come out marked as duplicates and skipped.
 *
 * Each card is two layers in the same box, the raw notification and the
 * result, clipped at the scan line, so a card turns into its result as it
 * crosses. Plain HTML/CSS over one WebGL background (React Bits' GradientASCII),
 * on a fixed 720×450 canvas scaled to fit. `still` freezes one card mid-scan:
 * the cover for Index and Projects.
 */

const W = 720;
const H = 450;
const LINE = 225; // the scan line
const CARD = 56;
const SLOT = 68;
const STEP = 2100; // ms per card: it crosses the light, then rests processed
const MOVE = 1100; // ms of that spent moving

type Item = {
  merchant: string;
  logo: string;
  raw: string;
  amount: string;
  category: string;
  /** Who sent it: the bank's app, or the bank's email in Gmail. */
  from: 'bancolombia' | 'nu' | 'gmail';
  bank: string;
  time: string;
  dup?: boolean;
};

/** In processing order: the first one goes through first. */
const ITEMS: Item[] = [
  { merchant: 'Rappi', logo: '/logos/demo/rappi.png', raw: 'RAPPI', amount: '$45.900', category: '🍔 Food', from: 'bancolombia', bank: 'Bancolombia', time: '13:41' },
  { merchant: 'Uber', logo: '/logos/demo/uber.svg', raw: 'UBER *TRIP', amount: '$18.400', category: '🚕 Transport', from: 'nu', bank: 'Nu', time: '14:05' },
  { merchant: 'Uber', logo: '/logos/demo/uber.svg', raw: 'UBER *TRIP', amount: '$18.400', category: '🚕 Transport', from: 'gmail', bank: 'Nu', time: '14:05', dup: true },
  { merchant: 'Netflix', logo: '/logos/demo/netflix.svg', raw: 'NETFLIX.COM', amount: '$44.900', category: '🍿 Streaming', from: 'bancolombia', bank: 'Bancolombia', time: '15:12' },
  { merchant: 'Starbucks', logo: '/logos/demo/starbucks.svg', raw: 'STARBUCKS ANDINO', amount: '$16.500', category: '☕️ Coffee', from: 'nu', bank: 'Nu', time: '16:30' },
  { merchant: 'Spotify', logo: '/logos/demo/spotify.svg', raw: 'SPOTIFY P1A2B3', amount: '$16.900', category: '🎧 Music', from: 'gmail', bank: 'Bancolombia', time: '17:02' },
  { merchant: 'Spotify', logo: '/logos/demo/spotify.svg', raw: 'SPOTIFY P1A2B3', amount: '$16.900', category: '🎧 Music', from: 'bancolombia', bank: 'Bancolombia', time: '17:02', dup: true },
  { merchant: 'Mercado Libre', logo: '/logos/mercadolibre-app.jpg', raw: 'MERCADOLIBRE*COMPRA', amount: '$129.000', category: '🛍️ Shopping', from: 'nu', bank: 'Nu', time: '18:47' },
];
const SOURCE = { bancolombia: '/logos/demo/bancolombia.png', nu: '/logos/demo/nubank.svg', gmail: '/logos/demo/gmail.svg' };
const LOOP = ITEMS.length * SLOT;

/** Top of card i when the conveyor has moved `off` px. Lower index = further down. */
const yOf = (i: number, off: number) => ((((off - i * SLOT) % LOOP) + LOOP) % LOOP) - SLOT;
/** At rest, the card just processed sits right under the line, in the gap between cards. */
const REST = LINE + (SLOT - CARD) / 2 + SLOT;
/** The still: Uber's email copy halfway through the light. */
const STILL_AT = LINE - CARD / 2 + 3 * SLOT;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const read = () => {
      const t = html.dataset.theme;
      setDark(t === 'dark' || (!t && mq.matches));
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    mq.addEventListener('change', read);
    return () => {
      mo.disconnect();
      mq.removeEventListener('change', read);
    };
  }, []);
  return dark;
}

function Raw({ it }: { it: Item }) {
  return (
    <div className="fs-face flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SOURCE[it.from]} alt="" className="size-8 shrink-0 rounded-[9px] shadow-[0_0_0_1px_var(--line)]" />
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2 text-[12.5px] font-semibold leading-4 text-fg">
          {it.bank}
          <span className="ml-auto text-[10.5px] font-normal text-fg-3">{it.time}</span>
        </p>
        <p className="mt-0.5 truncate font-mono text-[10.5px] leading-[14px] text-fg-3">
          Compra {it.amount} {it.raw} *4821
        </p>
      </div>
    </div>
  );
}

function Done({ it }: { it: Item }) {
  return (
    <div className={cn('fs-face flex items-center gap-2.5', it.dup && 'fs-dup')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={it.logo} alt="" className="size-8 shrink-0 rounded-[9px] shadow-[0_0_0_1px_var(--line)]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] font-semibold leading-4 text-fg">{it.merchant}</p>
        <p className="mt-0.5 truncate text-[11px] leading-[14px] text-fg-3">
          {it.dup ? 'Duplicate' : it.category}
        </p>
      </div>
      <span className={cn('tabular text-[13.5px] font-semibold tracking-[-0.01em] text-fg', it.dup && 'line-through decoration-fg-3')}>
        {it.amount}
      </span>
    </div>
  );
}

export function FinaScene({ still = false, className }: { still?: boolean; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(0);
  const dark = useDark();

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Moves every card and clips its two faces at the line. Written straight to
  // the elements each frame: nothing re-renders.
  useLayoutEffect(() => {
    let off = still ? STILL_AT : REST;
    const place = () => {
      cards.current.forEach((c, i) => {
        if (!c) return;
        const y = yOf(i, off);
        const into = Math.min(CARD, Math.max(0, LINE - y));
        c.style.transform = `translateY(${y.toFixed(2)}px)`;
        (c.children[0] as HTMLElement).style.clipPath = `inset(-32px -32px ${CARD - into}px -32px)`;
        (c.children[1] as HTMLElement).style.clipPath = `inset(${into}px -32px -32px -32px)`;
      });
    };
    place();
    const el = box.current;
    if (still || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let t = 0; // ms of play, paused while off screen
    let prev = 0;
    const tick = (now: number) => {
      t += prev ? Math.min(now - prev, 50) : 0;
      prev = now;
      const k = Math.floor(t / STEP);
      off = REST + SLOT * (k + easeInOut(Math.min(1, (t % STEP) / MOVE)));
      place();
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      prev = 0;
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [still]);

  return (
    <div
      ref={box}
      role="img"
      aria-label="Raw bank notifications pass through Fina and come out as logged purchases; a copy of a purchase that already came in is marked as a duplicate and skipped."
      className={cn('fscene relative w-full overflow-hidden rounded-[14px] bg-surface-2 shadow-ring', className)}
      style={{ aspectRatio: `${W} / ${H}` }}
      data-still={still || undefined}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
      >
        {/* The band of light */}
        <div className="fs-band absolute inset-x-0" style={{ top: LINE - 80, height: 160 }}>
          <GradientASCII
            shape="pinch"
            colors={dark ? ['#002a0a', '#00dc33', '#a6ffbf', '#f2fff5'] : ['#f2fff5', '#8ff0a8', '#00dc33', '#00a826']}
            lightMode={!dark}
            characters=" .:-=+*#%@"
            cellSize={10}
            density={0.9}
            glyphOpacity={1}
            glow={0.12}
            flicker={still ? 0 : 0.3}
            softness={0.35}
            scale={0.95}
            flow={0.5}
            speed={still ? 0 : 1}
            gradientOpacity={dark ? 0.45 : 0.4}
            grain={0}
            mouseInteraction={false}
            clickEffect="none"
            intro={false}
            dpr={undefined}
            style={undefined}
          />
        </div>

        {/* The belt */}
        <div className="fs-belt absolute inset-y-0 left-[180px] w-[360px]">
          {ITEMS.map((it, i) => (
            <div
              key={i}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="absolute inset-x-[30px] top-0"
              style={{ height: CARD }}
            >
              <Raw it={it} />
              <Done it={it} />
            </div>
          ))}
          <div className="fs-scan absolute inset-x-[8px]" style={{ top: LINE - 1 }} />
        </div>
      </div>
    </div>
  );
}
