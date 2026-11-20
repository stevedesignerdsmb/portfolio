'use client';

import { useCallback, useRef, useState } from 'react';
import { IconCompare } from '@/components/Icons';

/** Drag (or arrow-key) comparison between two images. */
export function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div>
      <div className="grid aspect-[16/10] place-items-center rounded-[14px] bg-surface-2 shadow-card">
      <div
        ref={ref}
        className="relative aspect-[10/16] h-[86%] touch-none select-none overflow-hidden rounded-[18px] bg-surface shadow-lift"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt={`${label}, after`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt={`${label}, before`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
          <div className="absolute top-1/2 -ml-4 -mt-4 grid size-8 place-items-center rounded-full bg-white text-[#131316] shadow-lift">
            <IconCompare size={15} aria-hidden />
          </div>
        </div>
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[12px] text-white backdrop-blur">Before</span>
        <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[12px] text-white backdrop-blur">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${label}`}
          className="absolute inset-0 cursor-ew-resize opacity-0"
        />
      </div>
      </div>
      <p className="mt-2.5 text-[13px] text-fg-3">Drag to compare. Arrow keys work too.</p>
    </div>
  );
}
