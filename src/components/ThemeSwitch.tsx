'use client';

import { useEffect, useState } from 'react';
import { IconMonitor, IconMoon, IconSun } from '@/components/Icons';
import { cn } from '@/lib/utils';

type Pref = 'system' | 'light' | 'dark';
const KEY = 'theme';

function apply(pref: Pref) {
  const root = document.documentElement;
  const dark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  const next = dark ? 'dark' : 'light';
  if (root.dataset.theme === next) return;
  // Swap every token in one frame: no element tweens its own colour mid-switch.
  root.classList.add('theme-switching');
  root.dataset.theme = next;
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
}

/** Runs before paint (inlined in <head>) so there is no theme flash. */
export const themeScript = `(function(){try{var p=localStorage.getItem('${KEY}')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

function usePref() {
  const [pref, setPref] = useState<Pref>('system');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setPref((localStorage.getItem(KEY) as Pref) || 'system');
    } catch {}
    // Let the stored value land before the indicator is allowed to animate.
    requestAnimationFrame(() => setReady(true));
  }, []);
  useEffect(() => {
    apply(pref);
    if (pref !== 'system') return;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const on = () => apply('system');
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [pref]);
  const set = (p: Pref) => {
    setPref(p);
    try {
      localStorage.setItem(KEY, p);
    } catch {}
  };
  return [pref, set, ready] as const;
}

const options: { value: Pref; label: string; Icon: typeof IconSun }[] = [
  { value: 'system', label: 'System', Icon: IconMonitor },
  { value: 'light', label: 'Light', Icon: IconSun },
  { value: 'dark', label: 'Dark', Icon: IconMoon },
];

/** Segmented control: System / Light / Dark, with one indicator that slides. */
export function ThemeSwitch({ className }: { className?: string }) {
  const [pref, set, ready] = usePref();
  const i = Math.max(0, options.findIndex((o) => o.value === pref));
  return (
    <div role="radiogroup" aria-label="Color theme" className={cn('relative inline-flex rounded-[9px] bg-surface-3 p-0.5', className)}>
      <span
        aria-hidden
        className={cn(
          'absolute left-0.5 top-0.5 h-6 w-7 rounded-[7px] bg-surface shadow-button',
          ready && 'transition-transform duration-300 ease-out-expo',
        )}
        style={{ transform: `translateX(${i * 28}px)` }}
      />
      {options.map(({ value, label, Icon }) => {
        const on = pref === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={on}
            aria-label={label}
            title={label}
            onClick={() => set(value)}
            data-cuelume-select=""
            className={cn(
              'relative grid h-6 w-7 place-items-center rounded-[7px] transition-colors duration-150',
              on ? 'text-fg' : 'text-fg-3 hover:text-fg',
            )}
          >
            {/* Only the active theme is solid; the others stay as outlines */}
            <Icon size={14} weight={on ? 'fill' : 'regular'} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}

/** Compact single-button cycle for the mobile header. */
export function ThemeCycle() {
  const [pref, set] = usePref();
  const i = options.findIndex((o) => o.value === pref);
  const { Icon, label } = options[i];
  const next = options[(i + 1) % options.length];
  return (
    <button
      onClick={() => set(next.value)}
      data-cuelume-select=""
      aria-label={`Theme: ${label}. Switch to ${next.label}`}
      className="grid size-8 place-items-center rounded-[9px] text-fg-2 shadow-button transition-colors duration-150 hover:text-fg active:scale-[0.96]"
    >
      <Icon size={15} aria-hidden />
    </button>
  );
}

/** Mockup-only: show or flatten the [[placeholder]] marks. */
const TK_KEY = 'tk';
export const tkScript = `(function(){try{var v=localStorage.getItem('${TK_KEY}');if(v)document.documentElement.dataset.tk=v;}catch(e){}})();`;

export function PlaceholderToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    try {
      setOn(localStorage.getItem(TK_KEY) !== 'off');
    } catch {}
  }, []);
  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.tk = next ? 'on' : 'off';
    try {
      localStorage.setItem(TK_KEY, next ? 'on' : 'off');
    } catch {}
  };
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className="flex w-full items-center justify-between text-[13px] text-fg-3 transition-colors hover:text-fg"
    >
      Placeholders
      <span className={cn('relative h-4 w-7 rounded-full transition-colors duration-200', on ? 'bg-fg' : 'bg-surface-3')}>
        <span
          className={cn(
            'absolute left-0.5 top-0.5 size-3 rounded-full bg-surface shadow-sm transition-transform duration-200 ease-out-quart',
            on && 'translate-x-3',
          )}
        />
      </span>
    </button>
  );
}
