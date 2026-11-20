'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type View = 'tldr' | 'detailed';

/**
 * Two reads of one case study: a TL;DR that is enough to judge the work, and
 * the detailed version. Plain text tabs, no pill, so it stays this site's UI.
 * The choice lives in the URL (?view=detailed) so a link opens the same read,
 * and the sidebar's contents tree shows only with the detailed read.
 *
 * Motion, by Emil's framework: switching happens once or twice a visit and
 * swaps the whole page under you, so it earns a short enter (opacity, 4px,
 * a 2px blur that hides the swap; 220ms ease-out). The old read leaves
 * instantly, nothing plays on load, and one underline slides between tabs.
 * No reading times: "2 min" made the detailed read look like a cost.
 */
export function CaseView({
  hero,
  tldr,
  detailed,
}: {
  hero: React.ReactNode;
  tldr: React.ReactNode;
  detailed: React.ReactNode;
}) {
  const [view, setView] = useState<View>('tldr');
  /** Only a switch the visitor made animates; the first paint never does. */
  const [switched, setSwitched] = useState(false);
  const tabs = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const t = tabs.current?.querySelector<HTMLElement>(`#tab-${view}`);
      if (t) setBar({ x: t.offsetLeft, w: t.offsetWidth });
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [view]);

  useEffect(() => {
    if (new URLSearchParams(location.search).get('view') === 'detailed') setView('detailed');
  }, []);

  useEffect(() => {
    // detail 'user' tells the sidebar to animate; a ?view=detailed load doesn't.
    window.dispatchEvent(new CustomEvent('caseview', { detail: switched ? 'user' : 'load' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const go = (v: View, scroll?: boolean) => {
    if (v === view) return;
    setSwitched(true);
    setView(v);
    const url = new URL(location.href);
    if (v === 'detailed') url.searchParams.set('view', 'detailed');
    else url.searchParams.delete('view');
    history.replaceState(history.state, '', url);
    if (scroll) tabs.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const items: { v: View; label: string }[] = [
    { v: 'tldr', label: 'TL;DR' },
    { v: 'detailed', label: 'Detailed' },
  ];

  return (
    <>
      <div ref={tabs} role="tablist" aria-label="How much to read" className="relative mt-8 flex scroll-mt-10 gap-5 border-b border-line">
        {bar ? (
          <span
            aria-hidden
            className={cn('absolute -bottom-px left-0 h-px bg-fg', switched && 'transition-[transform,width] duration-200 ease-out-quart motion-reduce:transition-none')}
            style={{ width: bar.w, transform: `translateX(${bar.x}px)` }}
          />
        ) : null}
        {items.map(({ v, label }) => {
          const on = view === v;
          return (
            <button
              key={v}
              role="tab"
              type="button"
              id={`tab-${v}`}
              aria-selected={on}
              aria-controls={`panel-${v}`}
              onClick={() => go(v)}
              data-cuelume-select=""
              className={cn(
                'pb-2.5 text-[14px] font-[460] leading-5 transition-colors duration-150',
                on ? 'text-fg' : 'text-fg-3 hover:text-fg',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {hero}

      <div id="panel-tldr" role="tabpanel" aria-labelledby="tab-tldr" hidden={view !== 'tldr'} className={switched ? 'case-enter' : undefined}>
        {tldr}
        <button
          type="button"
          onClick={() => go('detailed', true)}
          data-cuelume-tap=""
          className="group mt-8 inline-flex items-center gap-1 text-[14px] font-medium leading-5 text-fg"
        >
          Read the detailed version
          <svg aria-hidden width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>
      <div id="panel-detailed" role="tabpanel" aria-labelledby="tab-detailed" hidden={view !== 'detailed'} className={switched ? 'case-enter' : undefined}>
        {detailed}
      </div>
    </>
  );
}
