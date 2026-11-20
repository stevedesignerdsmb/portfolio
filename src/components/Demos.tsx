'use client';

import { play } from 'cuelume';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DotMorph } from './DotMorph';
import { FinaWave } from './FinaWave';
import { IconCaretDown, IconCheck, IconReplay, IconSparkle } from './Icons';
import { PromptBox } from './PromptBox';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Frame shared by every demo                                          */
/* ------------------------------------------------------------------ */

function Demo({
  title,
  note,
  onReplay,
  className,
  stage,
  children,
}: {
  title: string;
  note: string;
  onReplay?: () => void;
  className?: string;
  stage?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn('flex flex-col overflow-hidden rounded-[14px] bg-surface-2', className)}>
      <div className={cn('relative grid flex-1 place-items-center p-6', stage)}>{children}</div>
      <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-3.5">
        <span className="min-w-0">
          <span className="text-[14px] font-medium text-fg">{title}</span>
          <span className="ml-2 text-[13px] text-fg-3">{note}</span>
        </span>
        {onReplay ? (
          <button
            type="button"
            onClick={onReplay}
            data-cuelume-tap=""
            className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-[8px] px-2 text-[13px] text-fg-3 transition-[color,transform] duration-150 ease-out hover:text-fg active:scale-[0.97]"
          >
            <IconReplay size={12} aria-hidden />
            Replay
          </button>
        ) : null}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Blueprint → prompt                                               */
/* ------------------------------------------------------------------ */

const bigBox = (w: number, h: number) => {
  const bw = Math.min(w - 48, 460);
  const bh = 104;
  return { x: (w - bw) / 2, y: (h - bh) / 2 + 10, w: bw, h: bh, r: 16 };
};

function PromptDemo() {
  const [k, setK] = useState(0);
  const [sent, setSent] = useState<string[]>([]);
  return (
    <Demo
      title="Blueprint to prompt"
      note="Canvas, then real DOM"
      onReplay={() => {
        setSent([]);
        setK((n) => n + 1);
      }}
      stage="p-0"
    >
      <div className="relative h-[300px] w-full">
        <div className="absolute inset-x-0 top-5 flex flex-col items-center gap-1.5">
          <AnimatePresence initial={false}>
            {sent.slice(-2).map((m, i) => (
              <motion.span
                key={m + i + sent.length}
                layout
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                className="max-w-[80%] truncate rounded-full bg-surface px-3 py-1 text-[13px] text-fg shadow-[0_0_0_1px_var(--line)]"
              >
                {m}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <DotMorph key={k} box={bigBox} className="absolute inset-0" step={6}>
          <PromptBox interactive placeholder="Type something and press Enter…" onSend={(t) => setSent((s) => [...s, t])} />
        </DotMorph>
      </div>
    </Demo>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Agent streaming                                                  */
/* ------------------------------------------------------------------ */

const steps = ['Read 3 statements', 'Matched 48 purchases to cards', 'Checked what’s due this week'];
const SOURCE = 'bbva.mx';
const before = 'You spent $1,240 on food in October, about 18% more than September.'.split(' ');
const after = 'Your Visa payment of $820 is due Friday; paying it Thursday avoids the late fee.'.split(' ');
const TOTAL = before.length + 1 + after.length; // +1 for the source chip

/** 3×3 pixel loader: cells light up in a snake, like beautifului.dev's "Drive". */
function PixelGrid() {
  const order = [0, 1, 2, 5, 4, 3, 6, 7, 8];
  return (
    <span aria-hidden className="grid size-[11px] grid-cols-3 gap-px">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="pixel size-[3px] rounded-[0.5px] bg-fg" style={{ animationDelay: `${order.indexOf(i) * 90}ms` }} />
      ))}
    </span>
  );
}

function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'answer'>('idle');
  const [shown, setShown] = useState(0); // steps revealed
  const [words, setWords] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setOpen(false);
    if (reduce) {
      setPhase('answer');
      setShown(steps.length);
      setWords(TOTAL);
      setElapsed(3.2);
      return;
    }
    setPhase('thinking');
    setShown(0);
    setWords(0);
    setElapsed(0);
    const t0 = performance.now();
    const tick = window.setInterval(() => setElapsed((performance.now() - t0) / 1000), 100);
    const ids: number[] = [];
    const at = (ms: number, fn: () => void) => ids.push(window.setTimeout(fn, ms));
    steps.forEach((_, i) => at(700 + i * 850, () => setShown(i + 1)));
    at(3300, () => {
      window.clearInterval(tick);
      setPhase('answer');
    });
    for (let i = 0; i < TOTAL; i++) at(3600 + i * 55, () => setWords(i + 1));
    return () => {
      ids.forEach(clearTimeout);
      window.clearInterval(tick);
    };
  }, [inView, run, reduce]);

  const thinking = phase === 'thinking';
  const word = (w: string, i: number) => (
    <span key={`${run}-${i}`} className="word-in">
      {w}{' '}
    </span>
  );

  return (
    <Demo title="Agent, streaming" note="Think, collapse, stream" onReplay={() => setRun((r) => r + 1)} stage="min-h-[260px] items-start">
      <div ref={ref} className="w-full max-w-[440px] pt-2 text-[14px]">
        <p className="ml-auto w-fit max-w-[80%] rounded-[12px] bg-surface px-3 py-1.5 text-fg shadow-[0_0_0_1px_var(--line)]">
          How much did I spend on food, and what’s due?
        </p>

        {/* Thinking header: pixel loader + shimmer while working, then a quiet summary */}
        <button
          type="button"
          onClick={() => phase === 'answer' && setOpen((o) => !o)}
          className={cn('mt-4 flex h-6 items-center gap-2 text-[13px]', phase === 'answer' ? 'cursor-pointer text-fg-3 hover:text-fg' : 'cursor-default')}
        >
          <span className="relative grid size-[11px] place-items-center">
            <span className={cn('absolute transition-[opacity,filter] duration-200', thinking || phase === 'idle' ? 'opacity-100' : 'opacity-0 blur-[2px]')}>
              <PixelGrid />
            </span>
            <IconSparkle
              size={12}
              className={cn('absolute transition-[opacity,filter,transform] duration-300 ease-out-expo', phase === 'answer' ? 'scale-100 opacity-100' : 'scale-75 opacity-0 blur-[2px]')}
            />
          </span>
          <span className="grid">
            <span
              className={cn(
                'flex items-center gap-2 [grid-area:1/1] transition-[opacity,filter] duration-200',
                phase === 'answer' ? 'opacity-0 blur-[2px]' : 'opacity-100',
              )}
            >
              <span className="shimmer">Thinking</span>
              <span className="tabular font-mono text-[12px] text-fg-4">{elapsed.toFixed(1)}s</span>
            </span>
            <span
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap [grid-area:1/1] transition-[opacity,filter] duration-300',
                phase === 'answer' ? 'opacity-100' : 'pointer-events-none opacity-0 blur-[2px]',
              )}
            >
              Thought for {Math.max(1, Math.round(elapsed))} seconds
              <IconCaretDown size={11} className={cn('transition-transform duration-200 ease-out-quart', open && 'rotate-180')} />
            </span>
          </span>
        </button>

        {/* Steps: listed while thinking, folded away once the answer starts */}
        <AnimatePresence initial={false}>
          {thinking || open ? (
            <motion.div
              key="steps"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
              className="overflow-hidden"
            >
              <ul className="ml-[5px] mt-1.5 space-y-1.5 border-l border-line pb-1 pl-[13px]">
                {steps.slice(0, open ? steps.length : shown + 1).map((st, i) => {
                  const done = open || i < shown;
                  return (
                    <li key={st} className="word-in flex h-5 items-center gap-2 text-[13px] text-fg-3">
                      <span className="relative grid size-3 place-items-center">
                        <span className={cn('absolute size-2.5 animate-spin rounded-full border border-fg-4 border-t-transparent [animation-duration:0.7s] transition-opacity duration-200', done ? 'opacity-0' : 'opacity-100')} />
                        <IconCheck size={11} className={cn('absolute text-fg-3 transition-[opacity,transform] duration-300 ease-out-expo', done ? 'scale-100 opacity-100' : 'scale-50 opacity-0')} />
                      </span>
                      {st}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Answer, streamed word by word with an inline source chip */}
        <p className="mt-3 min-h-[60px] leading-[22px] text-fg" aria-live="polite">
          {before.slice(0, Math.min(words, before.length)).map(word)}
          {words > before.length ? (
            <span key={`${run}-src`} className="word-in mr-1 inline-flex h-5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-surface-3 px-1.5 align-middle font-mono text-[11px] text-fg-3">
              <span className="size-2 rounded-[2px] bg-[#004481]" aria-hidden />
              {SOURCE}
            </span>
          ) : null}
          {after.slice(0, Math.max(0, words - before.length - 1)).map((w, i) => word(w, before.length + 1 + i))}
          {phase === 'answer' && words < TOTAL ? <span className="caret" aria-hidden /> : null}
        </p>
      </div>
    </Demo>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Morphing button                                                  */
/* ------------------------------------------------------------------ */

type BState = 'idle' | 'busy' | 'done';
const label: Record<BState, string> = { idle: 'Publish', busy: 'Publishing', done: 'Published' };

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 animate-spin [animation-duration:0.7s]" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M8 2 a6 6 0 0 1 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MorphButtonDemo() {
  const [s, setS] = useState<BState>('idle');
  const go = useCallback(() => {
    if (s !== 'idle') return;
    setS('busy');
    play('loading', { emphasis: 'subtle' });
    window.setTimeout(() => {
      setS('done');
      play('success');
    }, 1400);
    window.setTimeout(() => setS('idle'), 3000);
  }, [s]);
  return (
    <Demo title="Morphing button" note="Layout spring" stage="h-[240px]">
      <motion.button
        layout
        type="button"
        onClick={go}
        transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
        className={cn(
          'inline-flex h-9 items-center gap-2 overflow-hidden rounded-full px-4 text-[14px] font-medium transition-colors duration-200 active:scale-[0.97]',
          s === 'done' ? 'bg-ok text-white' : 'bg-primary text-primary-fg shadow-primary',
        )}
        style={{ borderRadius: 999 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={s}
            layout
            initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            {s === 'busy' ? <Spinner /> : s === 'done' ? <IconCheck size={14} /> : null}
            {label[s]}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </Demo>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Hold to confirm                                                  */
/* ------------------------------------------------------------------ */

function HoldDemo() {
  const [done, setDone] = useState(false);
  const timer = useRef(0);
  const start = () => {
    if (done) return;
    timer.current = window.setTimeout(() => {
      setDone(true);
      play('close', { emphasis: 'strong' });
      window.setTimeout(() => setDone(false), 1800);
    }, 1500);
  };
  const cancel = () => window.clearTimeout(timer.current);
  return (
    <Demo title="Hold to delete" note="clip-path" stage="h-[240px]">
      <button
        type="button"
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && start()}
        onKeyUp={cancel}
        data-done={done || undefined}
        className="hold group/hold relative inline-flex h-9 select-none items-center overflow-hidden rounded-full bg-surface px-4 text-[14px] font-medium text-fg shadow-button transition-transform duration-150 ease-out active:scale-[0.97]"
      >
        <span>{done ? 'Deleted' : 'Hold to delete'}</span>
        <span aria-hidden className="hold-fill absolute inset-0 flex items-center bg-[#e5484d] px-4 text-white">
          {done ? 'Deleted' : 'Hold to delete'}
        </span>
      </button>
    </Demo>
  );
}

function FinaDemo() {
  const [k, setK] = useState(0);
  return (
    <Demo title="Fina, logging a purchase" note="Waves while it reads" onReplay={() => setK((n) => n + 1)} stage="py-10">
      <FinaWave key={k} autoPlay={k > 0} />
    </Demo>
  );
}

export function Demos() {
  return (
    <div className="grid gap-4">
      <PromptDemo />
      <div className="grid gap-4 sm:grid-cols-2">
        <MorphButtonDemo />
        <HoldDemo />
      </div>
      <FinaDemo />
      <AgentDemo />
    </div>
  );
}
