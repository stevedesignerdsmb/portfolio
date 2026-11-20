import { site } from '@/content/site';
import { IconMail, IconX } from './Icons';
import { cn } from '@/lib/utils';

/**
 * The two ways to reach me, as buttons instead of link columns. On hover the
 * label rolls up and an identical one rolls in from below, while the icon
 * nudges; one soft move, nothing that shouts.
 */
function Roll({ children }: { children: string }) {
  return (
    <span className="roll relative block h-5 overflow-hidden">
      <span className="roll-a block">{children}</span>
      <span aria-hidden className="roll-b absolute inset-x-0 top-full block">
        {children}
      </span>
    </span>
  );
}

const base =
  'cta group inline-flex h-9 select-none items-center gap-2 rounded-full pl-3.5 pr-4 text-[14px] font-medium leading-5 tracking-[-0.006em] transition-[background-color,box-shadow,transform] duration-200 ease-out-quart active:scale-[0.97]';

export function ContactButtons({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <a href={`mailto:${site.email}`} data-cuelume-tap="" className={cn(base, 'cta-primary bg-fg text-surface')}>
        <IconMail size={16} weight="fill" className="cta-icon shrink-0 opacity-80" />
        <Roll>Get in touch</Roll>
      </a>
      <a
        href={site.x}
        data-cuelume-tap=""
        target="_blank"
        rel="noreferrer"
        className={cn(base, 'cta-ghost bg-surface text-fg shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-surface-2')}
      >
        <IconX size={15} weight="bold" className="cta-icon shrink-0" />
        <Roll>DM me on X</Roll>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
