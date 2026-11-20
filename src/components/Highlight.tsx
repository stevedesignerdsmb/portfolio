'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A highlighter pass over the one line of a case study that matters most, in
 * turquoise. Plain CSS: the marker is the span's own background, so it sits
 * exactly under the text, follows every line break and never covers a letter.
 * It sweeps left to right, line by line, once the sentence is in view
 * (.marker in globals.css). One per read at most.
 *
 * Written in content as ((text)); see Rich.tsx.
 */
export function Highlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setOn(true);
      },
      // Start once the sentence is comfortably on screen, not at the very bottom edge.
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="marker" data-on={on ? '' : undefined}>
      {children}
    </span>
  );
}
