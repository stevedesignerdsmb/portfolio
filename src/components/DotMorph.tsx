'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type Box = { x: number; y: number; w: number; h: number; r: number };
export type P = { x: number; y: number };

/** Evenly spaced points along a rounded rectangle's outline. */
function outline(b: Box, step: number): P[] {
  const { x, y, w, h } = b;
  const r = Math.min(b.r, w / 2, h / 2);
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const segs = [sw, arc, sh, arc, sw, arc, sh, arc];
  const total = segs.reduce((a, c) => a + c, 0);
  const n = Math.max(12, Math.round(total / step));
  const pts: P[] = [];
  for (let i = 0; i < n; i++) {
    let d = (i / n) * total;
    let k = 0;
    while (d > segs[k]) d -= segs[k++];
    const t = segs[k] ? d / segs[k] : 0;
    const corner = (cx: number, cy: number, a0: number) => {
      const a = a0 + (t * Math.PI) / 2;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    };
    switch (k) {
      case 0: pts.push({ x: x + r + t * sw, y }); break;
      case 1: pts.push(corner(x + w - r, y + r, -Math.PI / 2)); break;
      case 2: pts.push({ x: x + w, y: y + r + t * sh }); break;
      case 3: pts.push(corner(x + w - r, y + h - r, 0)); break;
      case 4: pts.push({ x: x + w - r - t * sw, y: y + h }); break;
      case 5: pts.push(corner(x + r, y + h - r, Math.PI / 2)); break;
      case 6: pts.push({ x, y: y + h - r - t * sh }); break;
      default: pts.push(corner(x + r, y + r, Math.PI)); break;
    }
  }
  return pts;
}

export const line = (x0: number, x1: number, y: number, step: number): P[] => {
  const n = Math.max(2, Math.round((x1 - x0) / step));
  return Array.from({ length: n }, (_, i) => ({ x: x0 + ((x1 - x0) * i) / (n - 1), y }));
};

export const circle = (cx: number, cy: number, r: number, n: number): P[] =>
  Array.from({ length: n }, (_, i) => ({ x: cx + r * Math.cos((i / n) * Math.PI * 2), y: cy + r * Math.sin((i / n) * Math.PI * 2) }));

/** Inside a prompt box: the placeholder line and the send button. */
export const promptDetail = (b: Box, step: number): P[] => [
  ...line(b.x + 16, b.x + Math.min(b.w * 0.42, 150), b.y + 22, step),
  ...circle(b.x + b.w - 22, b.y + b.h - 22, 9, 12),
];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The transitions.dev opening, in canvas: a ring of dots turns, then every
 * dot flies to a spot on the outline of a prompt box (its blueprint), and the
 * real, usable box develops on top as the dots fade. Plays once on view.
 *
 * `box` is where the final UI sits, in CSS px inside the stage.
 */
export function DotMorph({
  box,
  children,
  className,
  step = 7,
  replayKey = 0,
  detail,
}: {
  box: (w: number, h: number) => Box;
  detail?: (b: Box, step: number) => P[];
  children: React.ReactNode;
  className?: string;
  step?: number;
  replayKey?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [geom, setGeom] = useState<Box | null>(null);

  const run = useCallback(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return () => {};
    const { width: W, height: H } = el.getBoundingClientRect();
    const b = box(W, H);
    setGeom(b);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr;
    cv.height = H * dpr;
    const ctx = cv.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const ink = getComputedStyle(el).getPropertyValue('--fg-3').trim() || '#888';

    // Target: the box outline plus whatever sits inside it (by default, a
    // prompt's placeholder line and send button).
    const target = [...outline(b, step), ...(detail ?? promptDetail)(b, step)];
    const n = target.length;
    const R = Math.min(W, H) * 0.3;
    const start = target.map((_, i) => {
      const a = (i / n) * Math.PI * 2;
      // two rings, slightly offset, like a halftone dial
      const rr = R * (i % 2 ? 1 : 0.82);
      return { x: W / 2 + rr * Math.cos(a), y: H / 2 + rr * Math.sin(a) };
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRevealed(true);
      return () => {};
    }
    setRevealed(false);

    const SPIN = 700;
    const MORPH = 1000;
    const HOLD = 350;
    const FADE = 450;
    const t0 = performance.now();
    let raf = 0;
    let shown = false;

    const frame = (now: number) => {
      const t = now - t0;
      ctx.clearRect(0, 0, W, H);
      const spin = Math.min(t / (SPIN + MORPH), 1);
      const rot = easeOut(spin) * 0.9;
      const fadeIn = Math.min(t / 300, 1);
      const fadeOut = t > SPIN + MORPH + HOLD ? 1 - Math.min((t - SPIN - MORPH - HOLD) / FADE, 1) : 1;
      if (!shown && t > SPIN + MORPH + HOLD) {
        shown = true;
        setRevealed(true);
      }
      ctx.fillStyle = ink;
      ctx.globalAlpha = fadeIn * fadeOut;
      for (let i = 0; i < n; i++) {
        const s = start[i];
        // rotate the ring around the centre while it waits
        const dx = s.x - W / 2;
        const dy = s.y - H / 2;
        const sx = W / 2 + dx * Math.cos(rot) - dy * Math.sin(rot);
        const sy = H / 2 + dx * Math.sin(rot) + dy * Math.cos(rot);
        const lag = (i / n) * 260;
        const m = easeInOut(Math.min(Math.max((t - SPIN - lag) / (MORPH - 260), 0), 1));
        const x = sx + (target[i].x - sx) * m;
        const y = sy + (target[i].y - sy) * m;
        ctx.beginPath();
        ctx.arc(x, y, 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
      if (t < SPIN + MORPH + HOLD + FADE) raf = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [box, step, detail]);

  // Start the first time the stage is mostly in view, and again on replay.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let stop = () => {};
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        stop = run();
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [run, replayKey]);

  return (
    <div ref={wrap} className={cn('relative', className)}>
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      {geom ? (
        <div
          className={cn(
            'absolute transition-[opacity,filter,transform] duration-500 ease-out-expo',
            revealed ? 'opacity-100 blur-0' : 'pointer-events-none scale-[0.985] opacity-0 blur-[6px]',
          )}
          style={{ left: geom.x, top: geom.y, width: geom.w, height: geom.h }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
