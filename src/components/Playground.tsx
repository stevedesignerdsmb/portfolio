'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconCaretLeft, IconCaretRight, IconClose } from '@/components/Icons';
import type { Shot as ShotT } from '@/content/site';
import { Rich } from './Rich';
import { cn } from '@/lib/utils';

const filters = ['All', 'Mobile', 'Web', 'System'] as const;

export function Playground({ shots }: { shots: ShotT[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const list = useMemo(() => (filter === 'All' ? shots : shots.filter((s) => s.kind === filter)), [filter, shots]);

  const show = (i: number) => {
    setOpen(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => {
    dialog.current?.close();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)),
    [list.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const onClose = () => setOpen(null);
    el.addEventListener('keydown', onKey);
    el.addEventListener('close', onClose);
    return () => {
      el.removeEventListener('keydown', onKey);
      el.removeEventListener('close', onClose);
    };
  }, [step]);

  const cur = open === null ? null : list[open];

  return (
    <>
      <div role="tablist" aria-label="Filter shots" className="mb-7 inline-flex rounded-[10px] bg-surface-3 p-0.5">
        {filters.map((f) => {
          const n = f === 'All' ? shots.length : shots.filter((s) => s.kind === f).length;
          const on = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f)}
              data-cuelume-select=""
              className={cn(
                'flex h-7 items-center gap-1.5 rounded-[8px] px-3 text-[14px] transition-[background-color,color,box-shadow] duration-200',
                on ? 'bg-surface text-fg shadow-button' : 'text-fg-3 hover:text-fg',
              )}
            >
              {f}
              <span className="tabular text-[12px] text-fg-4">{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="space-y-6">
        {list.map((s, i) => (
          <li key={s.id} className="break-inside-avoid">
            <button
              onClick={() => show(i)}
              data-cuelume-open=""
              className="group block w-full text-left"
              aria-label={`Open ${s.title}`}
            >
              <div className="overflow-hidden rounded-[14px] bg-surface-2 shadow-ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="block w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.012]"
                />
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-3 px-0.5">
                <span className="text-[14px] font-medium text-fg">{s.title}</span>
                <span className="text-[13px] text-fg-3">
                  {s.kind} · <Rich text={s.year} />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={cur?.title ?? 'Shot'}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[92dvh] w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-[#0b0b0d]/70 backdrop:backdrop-blur-[6px] open:animate-[lb-in_0.45s_var(--ease-out-expo)]"
      >
        {cur ? (
          <div className="overflow-hidden rounded-[18px] bg-surface shadow-lift">
            <div className="relative h-[min(72dvh,680px)] bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={`lo-${cur.id}`} src={cur.src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-contain p-4 sm:p-8" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={cur.id} src={cur.src.replace('w_1600', 'w_2400')} alt={cur.title} className="absolute inset-0 h-full w-full object-contain p-4 sm:p-8" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-fg">{cur.title}</p>
                <p className="truncate text-[14px] text-fg-3">
                  {cur.note} · {cur.kind} · <Rich text={cur.year} />
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <span className="tabular mr-2 text-[13px] text-fg-3">
                  {(open ?? 0) + 1} / {list.length}
                </span>
                {[
                  { d: -1, label: 'Previous', Icon: IconCaretLeft },
                  { d: 1, label: 'Next', Icon: IconCaretRight },
                ].map(({ d, label, Icon }) => (
                  <button
                    key={label}
                    onClick={() => step(d)}
                    data-cuelume-tap=""
                    aria-label={label}
                    className="grid size-8 place-items-center rounded-[9px] text-fg-2 shadow-button transition-colors hover:text-fg"
                  >
                    <Icon size={16} aria-hidden />
                  </button>
                ))}
                <button
                  onClick={close}
                  data-cuelume-close=""
                  aria-label="Close"
                  className="ml-1 grid size-8 place-items-center rounded-[9px] bg-fg text-surface shadow-button"
                >
                  <IconClose size={16} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
