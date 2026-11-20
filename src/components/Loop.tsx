'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted screen recording that plays only while it's on screen. Click it to
 * watch it full size (same dialog as the screens). With reduced motion it stays
 * on the poster and shows controls instead.
 */
export function Loop({ src, poster, label, ratio }: { src: string; poster?: string; label: string; ratio: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const big = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.controls = true;
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const open = () => {
    const d = dlg.current;
    const b = big.current;
    if (!d || !b) return;
    b.currentTime = ref.current?.currentTime ?? 0;
    d.showModal();
    b.play().catch(() => {});
  };
  const close = () => {
    big.current?.pause();
    dlg.current?.close();
  };

  return (
    <>
      <button type="button" onClick={open} aria-label={`${label} (watch full size)`} className="block w-full cursor-zoom-in">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{ aspectRatio: ratio }}
          className="block h-auto w-full"
        />
      </button>
      <dialog ref={dlg} onClick={close} onClose={() => big.current?.pause()} className="screen-dialog" aria-label={label}>
        <video
          ref={big}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          style={{ aspectRatio: ratio }}
          className="block h-auto w-full rounded-[12px]"
        />
      </dialog>
    </>
  );
}
