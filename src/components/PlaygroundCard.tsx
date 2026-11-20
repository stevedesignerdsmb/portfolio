'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IconArrowRight } from './Icons';

/**
 * A bento of tiles on a 6×3 grid (unit 24, gap 6): [col, row, cols, rows, tone].
 * Tone is how much ink is mixed into the surface (3–8%), so every fill stays
 * a grey from the card's own palette.
 */
const tiles: [number, number, number, number, number][] = [
  [0, 0, 2, 2, 7],
  [2, 0, 1, 1, 4],
  [3, 0, 2, 1, 5],
  [5, 0, 1, 2, 4],
  [2, 1, 2, 1, 8],
  [4, 1, 1, 1, 3],
  [0, 2, 1, 1, 5],
  [1, 2, 3, 1, 4],
  [4, 2, 2, 1, 6],
];
const U = 24;
const G = 6;
const at = (n: number) => n * (U + G);
const span = (n: number) => n * U + (n - 1) * G;

/**
 * Decorative. Blueprint first: every tile as a dashed outline. Then the tiles
 * fill in one after another, sweeping from the top-left corner, each in a grey
 * mixed from the card's own surface and ink; the dashed outline fades away
 * as it fills, so the finished tiles have no edges.
 */
function Bento({ live }: { live: boolean }) {
  return (
    <svg viewBox={`-1 -1 ${span(6) + 2} ${span(3) + 2}`} aria-hidden className="bento h-full w-full" data-live={live ? '' : undefined}>
      {tiles.map(([c, r, w, h, tone], i) => (
        <rect
          key={i}
          className="tile"
          x={at(c) + 0.5}
          y={at(r) + 0.5}
          width={span(w) - 1}
          height={span(h) - 1}
          rx="6"
          strokeWidth="1"
          style={{
            ['--d' as string]: `${(c + r) * 90 + i * 25}ms`,
            ['--tone' as string]: `color-mix(in oklab, var(--fg) ${tone}%, var(--surface-2))`,
          }}
        />
      ))}
    </svg>
  );
}

export function PlaygroundCard() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLive(true);
      return;
    }
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        // Let the blueprint be read for a beat before it fills.
        t = window.setTimeout(() => setLive(true), 500);
        io.disconnect();
      },
      { threshold: 0.7 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <Link ref={ref} href="/playground" className="group grid overflow-hidden rounded-[14px] bg-surface-2 sm:grid-cols-[minmax(0,1fr)_260px]">
      <div className="flex flex-col justify-between gap-6 p-6">
        <div>
          <p className="text-[15px] font-medium leading-[22px] text-fg">Playground</p>
          <p className="mt-0.5 text-[13px] leading-[18px] text-fg-3">Interaction experiments, built in code.</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-fg">
          Open
          <IconArrowRight size={13} aria-hidden className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5" />
        </span>
      </div>
      <div className="h-[160px] p-6 sm:pl-0">
        <Bento live={live} />
      </div>
    </Link>
  );
}
