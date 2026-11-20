'use client';

import { useState } from 'react';
import type { workplaces as W } from '@/content/site';

/**
 * "Where I've worked", measured off kevdu.co: 24px tiles, 6px radius, a 1px
 * inset outline and no drop shadow, a ~13px one-colour mark in muted ink.
 * Hovering or focusing one fills the tile with the brand (or swaps in the
 * full-colour logo) and names it next to the label. Each opens the company's
 * homepage, so it's clear these are real products.
 */
export function Workplaces({ items }: { items: typeof W }) {
  const [active, setActive] = useState<number | null>(null);
  const cur = active === null ? null : items[active];
  return (
    <div onPointerLeave={() => setActive(null)}>
      <p className="label h-5" aria-live="polite">
        Where I’ve worked
        {cur ? (
          <>
            {' · '}
            <span className="text-fg">{cur.name}</span>
            {cur.years ? <span className="text-fg-3">, {cur.years}</span> : null}
          </>
        ) : null}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((c, i) => (
          <li key={c.name}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${c.name}${c.years ? `, ${c.years}` : ''} (opens their site)`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              data-on={active === i || undefined}
              className="workplace grid size-6 place-items-center rounded-[6px]"
              style={{ ['--brand' as string]: c.bg, ['--brand-fg' as string]: c.fg }}
            >
              <span
                aria-hidden
                className="workplace-mark [grid-area:1/1]"
                style={{
                  width: c.markW ?? 13,
                  height: 13,
                  maskImage: `url(${c.mark})`,
                  WebkitMaskImage: `url(${c.mark})`,
                }}
              />
              {c.color ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.color}
                  alt=""
                  aria-hidden
                  className={c.colorFill ? 'workplace-color size-full rounded-[inherit] object-cover [grid-area:1/1]' : 'workplace-color [grid-area:1/1]'}
                  style={c.colorFill ? { width: '100%', height: '100%' } : { width: (c.markW ?? 13) + 2 }}
                />
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
