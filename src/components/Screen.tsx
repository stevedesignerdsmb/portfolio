'use client';

import { useEffect, useId, useRef, useState } from 'react';

type Box = { x: number; y: number; w: number; h: number };

/**
 * Everything outside the highlighted boxes dims, so a dense screen reads as one
 * idea. Drawn in SVG over the image, in % of its size, so it stays exact at
 * any width. The dim fades in once the screen is in view.
 */
function Spotlight({ boxes, on, aspect }: { boxes: Box[]; on: boolean; aspect: number }) {
  const id = useId().replace(/:/g, '');
  // Same corner radius on both axes, though the viewBox is stretched to the image.
  const rx = 1.2;
  const ry = rx * aspect;
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <mask id={`m${id}`}>
          <rect width="100" height="100" fill="white" />
          {boxes.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={rx} ry={ry} fill="black" />
          ))}
        </mask>
      </defs>
      <g className="spot" data-on={on || undefined}>
        <rect width="100" height="100" fill="rgb(0 0 0 / 0.32)" mask={`url(#m${id})`} />
        {boxes.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="0.9"
            ry="1.4"
            fill="none"
            stroke="rgb(255 255 255 / 0.28)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * A product screen in the case-study well, at its own proportions. Click to
 * see it full size; Escape or a click anywhere closes it.
 */
export function Screen({ src, alt, ratio, highlights = [] }: { src: string; alt: string; ratio: string; highlights?: Box[] }) {
  const ref = useRef<HTMLButtonElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const [seen, setSeen] = useState(false);
  const [w, h] = ratio.split('/').map(Number);
  const aspect = w / h;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" loading="lazy" decoding="async" style={{ aspectRatio: ratio }} className="block h-auto w-full" />
  );

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => dlg.current?.showModal()}
        aria-label={`${alt} (view full size)`}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-[inherit] text-left"
      >
        {img}
        {highlights.length ? <Spotlight boxes={highlights} on={seen} aspect={aspect} /> : null}
      </button>
      <dialog ref={dlg} onClick={() => dlg.current?.close()} className="screen-dialog" aria-label={alt}>
        <div className="relative overflow-hidden rounded-[12px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} style={{ aspectRatio: ratio }} className="block h-auto w-full" />
          {highlights.length ? <Spotlight boxes={highlights} on aspect={aspect} /> : null}
        </div>
      </dialog>
    </>
  );
}
