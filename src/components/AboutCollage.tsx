'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Item =
  | { kind: 'photo'; id: string; src: string; x: string; y: string; w: number; h: number; r: number; caption?: string; pos?: string }
  | { kind: 'oval'; id: string; src: string; x: string; y: string; w: number; h: number; r: number }
  | { kind: 'flag'; id: string; x: string; y: string; w: number; r: number };

// Array order is paint order: later items sit on top. Desk first, Guadalajara second.
const items: Item[] = [
  { kind: 'photo', id: 'pasta', src: '/about/pasta.jpg', x: '14%', y: '58%', w: 184, h: 216, r: -6 },
  { kind: 'oval', id: 'surf', src: '/about/surf.webp', x: '74%', y: '8%', w: 104, h: 136, r: 6 },
  { kind: 'oval', id: 'gym', src: '/about/gym.jpg', x: '6%', y: '30%', w: 104, h: 136, r: -7 },
  { kind: 'photo', id: 'gdl', src: '/about/guadalajara.jpg', x: '62%', y: '52%', w: 168, h: 200, r: 5, caption: 'Guadalajara' },
  { kind: 'photo', id: 'desk', src: '/about/desk.jpg', x: '33%', y: '0%', w: 208, h: 290, r: -2, caption: 'the desk', pos: '50% 42%' },
  // Colombia, as a sticker slapped on the corner of the desk photo
  { kind: 'flag', id: 'colombia', x: '30%', y: '40%', w: 58, r: -9 },
];

/**
 * A desk-top scatter of photos, like wireframe.co/about. Every
 * piece can be picked up and dropped; the last one touched comes to the top.
 */
export function AboutCollage() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(items.map((i) => i.id));
  const lift = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);

  return (
    <div>
      <div
        ref={stage}
        className="relative mx-auto h-[calc(520px*var(--s))] w-full max-w-[520px] [--s:0.68] sm:[--s:1]"
      >
        {items.map((it, k) => {
          const z = order.indexOf(it.id) + 1;
          return (
            <motion.div
              key={it.id}
              drag
              dragConstraints={stage}
              dragElastic={0.12}
              dragMomentum={false}
              onPointerDown={() => lift(it.id)}
              initial={reduce ? false : { opacity: 0, y: 14, rotate: it.r * 1.6, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotate: it.r, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: reduce ? 0 : k * 0.06 }}
              whileHover={reduce ? undefined : { scale: 1.03, rotate: it.r * 0.5 }}
              whileDrag={{ scale: 1.06, rotate: 0, cursor: 'grabbing' }}
              className="absolute cursor-grab touch-none select-none"
              style={{ left: it.x, top: it.y, zIndex: z }}
            >
              <Piece it={it} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Sizes scale with --s so the scatter keeps its shape on phones. */
const px = (n: number) => `calc(${n}px * var(--s))`;

function Piece({ it }: { it: Item }) {
  if (it.kind === 'flag') {
    // Vinyl sticker: white die-cut border, flag at 2:3 with its real proportions (yellow 1/2, blue 1/4, red 1/4).
    return (
      <div
        role="img"
        aria-label="Flag of Colombia"
        style={{ width: px(it.w), height: px(it.w * (2 / 3)) }}
        className="overflow-hidden rounded-[6px] border-[3px] border-white bg-white shadow-[0_1px_2px_rgb(0_0_0/0.15),0_6px_14px_-6px_rgb(0_0_0/0.35)]"
      >
        <div className="h-1/2 bg-[#FCD116]" />
        <div className="h-1/4 bg-[#003893]" />
        <div className="h-1/4 bg-[#CE1126]" />
      </div>
    );
  }
  if (it.kind === 'oval') {
    return (
      <div
        style={{ width: px(it.w), height: px(it.h) }}
        className="rounded-[50%] bg-[#f4f1ea] p-[7px] shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_8px_20px_-8px_rgb(0_0_0/0.3)] dark:bg-[#2a2926]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={it.src} alt="" draggable={false} className="h-full w-full rounded-[50%] object-cover" />
      </div>
    );
  }
  return (
    <figure
      style={{ width: px(it.w) }}
      className={cn(
        'rounded-[4px] bg-white p-2 pb-0 shadow-[0_0_0_1px_rgb(0_0_0/0.05),0_10px_24px_-10px_rgb(0_0_0/0.35)] dark:bg-[#f1f1f1]',
        !it.caption && 'pb-2',
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={it.src} alt="" draggable={false} style={{ height: px(it.h - (it.caption ? 40 : 16)), objectPosition: it.pos }} className="w-full rounded-[2px] object-cover" />
      {it.caption ? (
        <figcaption className="py-2 text-center font-mono text-[11px] text-[#71727d]">{it.caption}</figcaption>
      ) : null}
    </figure>
  );
}
