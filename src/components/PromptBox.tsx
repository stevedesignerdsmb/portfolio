'use client';

import { useState } from 'react';
import { IconArrowUp } from './Icons';
import { cn } from '@/lib/utils';

/**
 * The box the dots resolve into. Its placeholder and send button sit exactly
 * where DotMorph draws their blueprints (16px in, 22px down; button 22px in
 * from the bottom-right corner).
 */
export function PromptBox({
  placeholder = 'Ask anything…',
  interactive = false,
  onSend,
  className,
}: {
  placeholder?: string;
  interactive?: boolean;
  onSend?: (text: string) => void;
  className?: string;
}) {
  const [text, setText] = useState('');
  const ready = text.trim().length > 0;
  const send = () => {
    if (!ready) return;
    onSend?.(text.trim());
    setText('');
  };
  return (
    <div
      className={cn(
        'relative h-full w-full rounded-[14px] bg-surface shadow-[0_0_0_1px_var(--line-strong),0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)]',
        // Focus lives on the whole box: the hairline just darkens, no ring around the textarea.
        'transition-shadow duration-200 ease-out focus-within:shadow-[0_0_0_1px_var(--fg-4),0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.16)]',
        className,
      )}
    >
      {interactive ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={placeholder}
          aria-label="Prompt"
          rows={2}
          className="absolute inset-x-0 top-0 h-[calc(100%-44px)] resize-none bg-transparent px-4 pt-[13px] text-[14px] leading-[18px] text-fg caret-fg outline-none focus-visible:outline-none placeholder:text-fg-4"
        />
      ) : (
        <span className="absolute left-4 top-[13px] text-[14px] leading-[18px] text-fg-4">{placeholder}</span>
      )}
      <button
        type="button"
        tabIndex={interactive ? 0 : -1}
        aria-label="Send"
        onClick={send}
        disabled={interactive && !ready}
        className={cn(
          'absolute bottom-[10px] right-[10px] grid size-6 place-items-center rounded-full transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.94]',
          !interactive || ready ? 'bg-fg text-surface' : 'bg-surface-3 text-fg-4',
        )}
      >
        <IconArrowUp size={13} />
      </button>
    </div>
  );
}
