'use client';

import { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';

/**
 * The "New" circle from benji.org, with his exact settings: rough-notation
 * circle, strokeWidth 1.5, padding [2, 6], animationDuration 800, default two
 * passes, shown when 10% of it scrolls into view. Word and loop share the
 * accent, 14px.
 */
export function Annotate({
  children,
  stroke = 'var(--accent)',
  delay = 0,
}: {
  children: React.ReactNode;
  /** Colour of both the word and its loop. */
  stroke?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let a: ReturnType<typeof annotate> | null = null;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // Measure only once Inter has loaded, or the loop is sized for the fallback font.
        document.fonts.ready.then(() => {
          t = window.setTimeout(() => {
            a = annotate(el, {
              type: 'circle',
              color: getComputedStyle(el).getPropertyValue(stroke.slice(4, -1)).trim() || stroke,
              strokeWidth: 1.5,
              padding: [2, 6],
              animationDuration: 800,
              animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            });
            a.show();
          }, delay);
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
      a?.remove();
    };
  }, [delay, stroke]);

  return (
    <span style={{ marginLeft: '0.75rem', color: stroke }}>
      <span ref={ref}>{children}</span>
    </span>
  );
}
