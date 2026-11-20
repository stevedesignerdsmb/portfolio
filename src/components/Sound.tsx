'use client';

import { useEffect, useState } from 'react';
import { bind, play, setEnabled, setVolume, unlock } from 'cuelume';
import { IconSpeaker, IconSpeakerOff } from './Icons';
import { cn } from '@/lib/utils';

/**
 * Interface sounds via cuelume: synthesized live, no audio files. Controls opt
 * in with data-cuelume-* attributes (tap, select, open, close; the navigate whoosh is left out on purpose);
 * one-off moments call play() directly. Sound is on by default but browsers
 * keep it silent until the first click, so nothing ever plays on load.
 * The choice is remembered per visitor.
 */
const KEY = 'sound';

const read = () => {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
};

export function SoundBinder() {
  useEffect(() => {
    setVolume(0.6);
    setEnabled(read());
    return bind();
  }, []);
  return null;
}

/** Speaker button that sits beside the theme switch. */
export function SoundToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(true);
  useEffect(() => setOn(read()), []);

  const toggle = async () => {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(KEY, next ? 'on' : 'off');
    } catch {}
    if (next) {
      setEnabled(true);
      if (await unlock()) play('toggle');
    } else {
      play('toggle', { direction: 'back' });
      // Let the "off" cue sound before going quiet.
      window.setTimeout(() => setEnabled(false), 160);
    }
  };

  const Icon = on ? IconSpeaker : IconSpeakerOff;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Interface sounds"
      title={on ? 'Sounds on' : 'Sounds off'}
      onClick={toggle}
      className={cn(
        'grid h-7 w-7 place-items-center rounded-[9px] bg-surface-3 transition-[color,transform] duration-150 active:scale-[0.94]',
        on ? 'text-fg' : 'text-fg-3 hover:text-fg',
        className,
      )}
    >
      <Icon size={14} weight={on ? 'fill' : 'regular'} />
    </button>
  );
}
