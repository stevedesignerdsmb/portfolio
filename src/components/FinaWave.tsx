'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IconCheck } from './Icons';
import { cn } from '@/lib/utils';

type Phase = 'idle' | 'reading' | 'sweep' | 'done';

const VISA =
  'M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z';

function Visa({ className }: { className?: string }) {
  return (
    <svg viewBox="0 8 24 8" aria-label="Visa" role="img" className={cn('h-[9px] w-auto fill-[#1a1f71] dark:fill-white', className)}>
      <path d={VISA} />
    </svg>
  );
}

/** Fina's palette for the light: its logo green, plus mint, lime and a little sky. */
const blobs = [
  { c: '#00dc33', x: '18%', s: 0.95, d: '0s' },
  { c: '#7af0c8', x: '46%', s: 1.15, d: '-2s' },
  { c: '#d6f54a', x: '70%', s: 0.85, d: '-4s' },
  { c: '#6fd3ff', x: '88%', s: 0.8, d: '-1s' },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Progress of `t` through [a, b], eased. */
const seg = (t: number, a: number, b: number, ease = easeOut) => ease(clamp((t - a) / (b - a)));

// Timeline, in ms
const READ = 1700; // Fina reads; the light rises a little and waits
const SWEEP = 1150; // the front crosses the card, revealing the result behind it
const SETTLE = 1300; // colour lingers on the edges, then fades

/** Sparkles drifting up through the light while it's lit. */
function Sparkles({ on }: { on: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !on) return;
    const ctx = cv.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width: W, height: H } = cv.getBoundingClientRect();
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const ps = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: H * Math.random(),
      r: 0.4 + Math.random(),
      v: 6 + Math.random() * 14,
      t: Math.random() * 6,
    }));
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      for (const p of ps) {
        p.y -= p.v * dt;
        p.t += dt * 3;
        if (p.y < 0) {
          p.y = H;
          p.x = Math.random() * W;
        }
        ctx.globalAlpha = (0.3 + 0.7 * Math.abs(Math.sin(p.t))) * (p.y / H);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);
  return <canvas ref={ref} aria-hidden className="absolute inset-x-[16%] bottom-0 h-[55%]" />;
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-t border-line py-2.5 text-[13px] first:border-t-0">
      <span className="text-fg-3">{k}</span>
      <span className="flex items-center gap-1.5 text-fg">{children}</span>
    </div>
  );
}

/** Before: the raw bank notification Fina receives. */
function Before() {
  return (
    <div className="flex h-full flex-col p-5">
      <p className="text-[12px] text-fg-3">New bank notification</p>
      <div className="mt-2 rounded-[12px] bg-surface-2 p-3.5 text-[13px] leading-[19px]">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/demo/bancolombia.png" alt="" className="size-5 rounded-[5px]" />
          <span className="font-medium text-fg">Bancolombia</span>
          <span className="text-fg-3">· now</span>
        </div>
        <p className="mt-1.5 text-fg-2">Compra por $45.900 en RAPPI con tu T.Cred *4821. 18/11 13:42.</p>
      </div>
      <div className="mt-5 space-y-2 px-1">
        <div className="h-2 w-[70%] rounded-full bg-surface-3" />
        <div className="h-2 w-[45%] rounded-full bg-surface-3" />
        <div className="h-2 w-[58%] rounded-full bg-surface-3" />
      </div>
    </div>
  );
}

/** After: the purchase, logged. */
function After({ shown }: { shown: boolean }) {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex flex-col items-center pt-1 text-center">
        <span className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/demo/rappi.png" alt="Rappi" className="size-11 rounded-[12px] shadow-[0_2px_8px_-2px_rgb(0_0_0/0.25)]" />
          {shown ? (
            <span className="fwave-check absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-[#00dc33] text-white ring-2 ring-surface">
              <IconCheck size={11} />
            </span>
          ) : null}
        </span>
        <p className="mt-3 text-[13px] text-fg-3">Logged to Food</p>
        <p className="mt-0.5 text-[28px] font-medium tracking-[-0.03em] tabular">$45.900</p>
      </div>
      <div className="mt-4 rounded-[12px] bg-surface-2 px-3.5">
        <Row k="Merchant">Rappi</Row>
        <Row k="Card">
          <Visa />
          <span className="tabular">·· 4821</span>
        </Row>
        <Row k="Food this month">
          <span className="tabular">$412.300</span>
        </Row>
      </div>
    </div>
  );
}

/**
 * Distortion-wave style reveal, in Fina's colours. Tapping "Log it" blurs the
 * notification and pulls it toward the button while a soft light rises from
 * the bottom and Fina reads. Then that light sweeps up from the button:
 * behind it the logged purchase is already there, ahead of it the old card is
 * still blurred. Colour lingers on the edges and fades.
 *
 * Everything is driven by CSS variables set once per frame on the card:
 * --b blur of the old card, --w how far the light has risen, --r reveal size,
 * --f light opacity, --e edge glow.
 */
export function FinaWave({ autoPlay = false }: { autoPlay?: boolean }) {
  const card = useRef<HTMLDivElement>(null);
  const before = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const raf = useRef(0);
  const at = useRef({ r: 0 });

  /**
   * Writes each frame straight onto the elements that move (no CSS variables
   * on the parent, so no style recalculation for the whole card).
   * b: old card blur · w: how far the light has risen · r: reveal · f: light · e: edges
   */
  const set = ({ b, w, r, f, e }: { b: number; w: number; r: number; f: number; e: number }) => {
    at.current.r = r;
    if (before.current) {
      before.current.style.filter = b ? `blur(${(b * 12).toFixed(2)}px)` : '';
      before.current.style.transform = b ? `translateY(${(b * 6).toFixed(2)}px) scale(${(1 - b * 0.045).toFixed(4)})` : '';
      before.current.style.opacity = String(1 - b * 0.25);
    }
    if (after.current) {
      after.current.style.clipPath = `ellipse(${(r * 125).toFixed(2)}% ${(r * 145).toFixed(2)}% at 50% 100%)`;
      const ab = Math.max(0, 0.9 - r) * 8;
      after.current.style.filter = r > 0 && ab > 0.05 ? `blur(${ab.toFixed(2)}px)` : '';
    }
    if (light.current) {
      light.current.style.opacity = String(f);
      light.current.style.transform = `translateY(${(w * -195).toFixed(2)}%)`;
    }
    card.current?.style.setProperty('--e', e.toFixed(3));
  };

  /** "Done" wipes the result back down toward the button (fast: it's the system answering). */
  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const from = at.current.r;
    const t0 = performance.now();
    setPhase('idle');
    const frame = (now: number) => {
      const k = seg(now - t0, 0, 280, easeInOut);
      set({ b: 0, w: 0, r: from * (1 - k), f: 0, e: 0 });
      if (k < 1) raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
  }, []);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      set({ b: 0, w: 0, r: 1.3, f: 0, e: 0 });
      setPhase('done');
      return () => {};
    }
    const t0 = performance.now();
    let last: Phase = 'reading';
    setPhase('reading');
    const frame = (now: number) => {
      const t = now - t0;
      const s = seg(t, READ, READ + SWEEP, easeInOut); // sweep progress
      const w = 0.3 * seg(t, 0, 800) + 1.05 * s; // the front: rises, waits, then crosses
      set({
        b: seg(t, 0, 450) * (1 - seg(t, READ + SWEEP * 0.6, READ + SWEEP)),
        w,
        // the reveal trails just behind the front, and only once it starts to cross
        r: s > 0 ? Math.max(0, w - 0.22) * 1.1 : 0,
        f: seg(t, 0, 600) * (1 - seg(t, READ + SWEEP * 0.75, READ + SWEEP + 250)),
        e: seg(t, READ + SWEEP * 0.55, READ + SWEEP) * (1 - seg(t, READ + SWEEP + 200, READ + SWEEP + SETTLE)),
      });
      const p: Phase = t < READ ? 'reading' : t < READ + SWEEP ? 'sweep' : 'done';
      if (p !== last) {
        last = p;
        setPhase(p);
      }
      if (t < READ + SWEEP + SETTLE) raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  // Replay remounts this with autoPlay, so it runs straight through again.
  useEffect(() => (autoPlay ? run() : undefined), [autoPlay, run]);

  const busy = phase === 'reading' || phase === 'sweep';

  return (
    <div
      ref={card}
      className="fwave relative h-[380px] w-full max-w-[340px] overflow-hidden rounded-[22px] bg-surface shadow-[0_0_0_1px_var(--line),0_12px_32px_-16px_rgb(0_0_0/0.25)]"
    >
      {/* Old card: blurs and leans toward the button */}
      <div ref={before} className="absolute inset-0 origin-bottom">
        <Before />
      </div>

      {/* New card: revealed from the button upward, behind the front */}
      <div ref={after} className="absolute inset-0 bg-surface [clip-path:ellipse(0%_0%_at_50%_100%)]">
        <After shown={phase === 'sweep' || phase === 'done'} />
      </div>

      {/* The light: soft blobs of Fina's colours with sparkles. It rises a little
          while Fina reads, then carries the reveal up the card. */}
      <div ref={light} aria-hidden className="pointer-events-none absolute inset-x-[-20%] top-full h-[120%] opacity-0">
        <div className="fwave-blobs absolute inset-0">
          {blobs.map((b) => (
            <span
              key={b.c}
              className="fwave-blob absolute bottom-[6%] size-[70%] rounded-full"
              style={{ left: b.x, background: `radial-gradient(closest-side, ${b.c}, transparent)`, scale: b.s, animationDelay: b.d }}
            />
          ))}
        </div>
        {/* sparkles stay sharp: they sit outside the blurred layer */}
        <Sparkles on={busy} />
      </div>

      {/* Status while Fina reads */}
      <div
        aria-live="polite"
        // Centred in the area above the button, so it reads as the card's middle.
        data-on={phase === 'reading' || undefined}
        className="fwave-status pointer-events-none absolute inset-x-0 bottom-16 top-0 flex items-center justify-center gap-2 text-[14px] font-medium text-fg-2"
      >
        <span className="size-3.5 animate-spin rounded-full border-[1.5px] border-fg-4 border-t-fg [animation-duration:0.8s]" />
        Reading notification…
      </div>

      {/* Action */}
      <div className="absolute inset-x-5 bottom-5">
        <button
          type="button"
          onClick={() => (phase === 'idle' ? run() : phase === 'done' ? reset() : undefined)}
          disabled={busy}
          data-hidden={busy || undefined}
          className="fwave-btn h-11 w-full rounded-full bg-fg text-[14px] font-medium text-surface"
        >
          {phase === 'done' ? 'Done' : 'Log it with Fina'}
        </button>
      </div>
    </div>
  );
}
