'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ResumeDoc } from './ResumeDoc';
import { resumePdf } from '@/content/resume';
import { IconClose } from './Icons';
import { cn } from '@/lib/utils';

const Ctx = createContext<() => void>(() => {});

/**
 * One pop-up for the whole site. The sheet rises out of the trigger's
 * position (transform-origin set from the click), the backdrop fades;
 * closing is quicker than opening. Without JS the link goes to /cv.
 */
export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);

  const open = useCallback(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    setClosing(false);
    d.showModal();
    d.scrollTop = 0;
  }, []);

  const close = useCallback(() => {
    const d = dialog.current;
    if (!d?.open) return;
    setClosing(true);
    window.setTimeout(() => {
      d.close();
      setClosing(false);
    }, 160);
  }, []);

  // Esc runs the same exit animation instead of closing instantly.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    d.addEventListener('cancel', onCancel);
    return () => d.removeEventListener('cancel', onCancel);
  }, [close]);

  // A shared link ending in #resume opens it straight away.
  useEffect(() => {
    if (location.hash === '#resume') open();
  }, [open]);

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-label="Résumé"
        onClick={(e) => e.target === e.currentTarget && close()}
        className={cn('cv-dialog', closing && 'is-closing')}
      >
        <div className="cv-sheet">
          <div className="cv-bar">
            <p className="text-[13px] text-fg-3">Résumé</p>
            <div className="flex items-center gap-1.5">
              <a
                href={resumePdf}
                download="Steve-Calderon-CV.pdf"
                data-cuelume-tap=""
                className="flex h-8 items-center gap-1.5 rounded-[9px] bg-fg px-3 text-[13px] font-medium text-surface shadow-button transition-transform duration-150 active:scale-[0.97]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 2.5v8m0 0L4.75 7.25M8 10.5l3.25-3.25M3 13.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download PDF
              </a>
              <button
                onClick={close}
                data-cuelume-close=""
                aria-label="Close"
                className="grid size-8 place-items-center rounded-[9px] text-fg-2 shadow-button transition-colors hover:text-fg"
              >
                <IconClose size={16} aria-hidden />
              </button>
            </div>
          </div>
          <div className="cv-paper">
            <ResumeDoc />
          </div>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

/** A link to /cv that opens the pop-up instead when JS is on. */
export function ResumeLink({ className, children = 'Résumé' }: { className?: string; children?: React.ReactNode }) {
  const open = useContext(Ctx);
  return (
    <a
      href="/cv"
      data-cuelume-open=""
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open();
      }}
    >
      {children}
    </a>
  );
}
