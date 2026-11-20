import { IconImage, IconPlay } from '@/components/Icons';
import { cn } from '@/lib/utils';

/** Framed image well — Clerk-style layered shadow, quiet fill. */
export function Frame({
  children,
  className,
  interactive,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[14px] bg-surface-2 shadow-ring',

        className,
      )}
    >
      {children}
    </div>
  );
}

export function Shot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" className={cn('block h-full w-full object-cover', className)} />
  );
}

/** Placeholder for an asset Steve still has to export or record. */
export function MediaTK({
  label,
  kind = 'image',
  ratio = '16 / 10',
}: {
  label: string;
  kind?: 'image' | 'video';
  ratio?: string;
}) {
  const Icon = kind === 'video' ? IconPlay : IconImage;
  return (
    <div
      style={{ aspectRatio: ratio }}
      className="tk-media relative grid place-items-center overflow-hidden rounded-[14px] bg-surface-2 shadow-ring"
    >
      <div
        aria-hidden
        className="absolute inset-3 rounded-[10px] border border-dashed border-tk-line/70"
      />
      <div className="relative flex max-w-[34ch] flex-col items-center gap-2 px-6 text-center">
        <Icon size={20} className="text-tk-fg" aria-hidden />
        <span className="text-[13px] font-medium text-tk-fg">{kind === 'video' ? 'Video placeholder' : 'Image placeholder'}</span>
        <span className="text-[13px] leading-snug text-fg-3">{label}</span>
      </div>
    </div>
  );
}

/**
 * Logo tile, wireframe.co proportions: white tile, hairline border, 8px radius
 * at 40px, mark at ~55% of the tile. App icons (`fill`) run edge to edge.
 */
/** Dark mode: tiles go dark instead of glaring white; add per-mark fixes here if one needs help. */
const darkFix: Record<string, string> = {
};

export function Logo({
  src,
  monogram,
  name,
  size = 40,
  fill,
}: {
  src?: string;
  monogram?: string;
  name: string;
  size?: number;
  fill?: boolean;
}) {
  const radius = Math.round(size * 0.22);
  return (
    <span
      style={{ width: size, height: size, borderRadius: radius }}
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden',
        fill ? 'shadow-ring' : 'border border-[rgba(115,115,115,0.2)] bg-white dark:border-white/[0.08] dark:bg-surface-3',
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} logo`}
          // Marks live in a 56% × 50% box, so wide logos get width and square ones get height.
          style={fill ? undefined : { maxWidth: Math.round(size * 0.56), maxHeight: Math.round(size * 0.5) }}
          className={cn(fill ? 'h-full w-full object-cover' : 'h-auto w-auto object-contain', src && darkFix[src])}
        />
      ) : (
        <span className="text-[12px] font-medium tracking-tight text-[#71727d]">{monogram ?? name.slice(0, 2)}</span>
      )}
    </span>
  );
}

const statusTone: Record<string, string> = {
  Shipped: 'bg-ok',
  Live: 'bg-ok',
  'In beta': 'bg-accent',
  Prototype: 'bg-fg-4',
  Concept: 'bg-fg-4',
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2 py-0.5 text-[12px] font-medium text-fg-2">
      <span className={cn('size-1.5 rounded-full', statusTone[status] ?? 'bg-fg-4')} aria-hidden />
      {status}
    </span>
  );
}

/** One portrait phone screen with device-like rounding and depth. */
export function Phone({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('relative aspect-[10/16] overflow-hidden rounded-[18px] bg-surface shadow-lift', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}

/** Three phones on a quiet well; the middle one sits forward. */
export function PhoneTrio({ screens, alt, interactive }: { screens: string[]; alt: string; interactive?: boolean }) {
  const [a, b, c] = screens;
  return (
    <Frame interactive={interactive} className="aspect-[4/3] sm:aspect-[16/10]">
      <div className="absolute inset-0 flex items-center justify-center gap-[3.5%] px-[8%]">
        <Phone src={a} alt={`${alt}, screen 1`} className="w-[24%] translate-y-[4%] transition-transform duration-700 ease-out-expo group-hover:translate-y-[2%]" />
        <Phone src={b ?? a} alt={`${alt}, screen 2`} className="w-[27%] -translate-y-[2%] transition-transform duration-700 ease-out-expo group-hover:-translate-y-[4%]" />
        <Phone src={c ?? a} alt={`${alt}, screen 3`} className="w-[24%] translate-y-[4%] transition-transform duration-700 ease-out-expo group-hover:translate-y-[2%]" />
      </div>
    </Frame>
  );
}

/** Single phone screen centred in a 16:10 well. */
export function PhoneWell({ src, alt }: { src: string; alt: string }) {
  return (
    <Frame className="aspect-[16/10]">
      <div className="absolute inset-0 grid place-items-center">
        <Phone src={src} alt={alt} className="h-[84%] w-auto" />
      </div>
    </Frame>
  );
}
