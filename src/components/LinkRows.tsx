import Link from 'next/link';
import { Annotate } from './Annotate';
import { IconArrowRight, IconArrowUpRight } from './Icons';
import { Logo } from './Media';
import { Rich } from './Rich';
import { cn } from '@/lib/utils';

export type Row = {
  key: string;
  title: string;
  subtitle: string;
  meta: string;
  href?: string;
  external?: boolean;
  logo?: string;
  logoFill?: boolean;
  monogram?: string;
  /** Hand-drawn callout next to the title, e.g. "Featured". */
  badge?: string;
  /** Hide the meta column on phones so the subtitle keeps its one line. */
  metaFromSm?: boolean;
};

/**
 * Career-style list, measured off wireframe.co: 48px rows 24px apart, name
 * 15/500, role and dates 13 in grey, one line each. Hovering one row fades the others back.
 * A trailing arrow says where each row goes: → a case study here, ↗ another site.
 */
export function LinkRows({ rows }: { rows: Row[] }) {
  return (
    <ul className="group/list flex flex-col gap-6">
      {rows.map((r) => {
        const inner = (
          <>
            <Logo src={r.logo} fill={r.logoFill} monogram={r.monogram} name={r.title} size={48} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center text-[15px] font-medium leading-[22px] text-fg">
                <span className="truncate">{r.title}</span>
                {r.badge ? (
                  <span className="shrink-0 text-[14px] font-[460] leading-normal">
                    <Annotate>{r.badge}</Annotate>
                  </span>
                ) : null}
              </span>
              <span className="block truncate text-[13px] leading-[18px] text-fg-3">
                <Rich text={r.subtitle} />
              </span>
            </span>
            <span className={cn('tabular shrink-0 text-[13px] text-fg-3', r.metaFromSm && 'max-sm:hidden')}>
              <Rich text={r.meta} />
            </span>
            {/* Where the row goes: → stays on this site (a case study), ↗ opens another one. */}
            {r.href ? (
              r.external ? (
                <>
                  <span className="sr-only">(opens in a new tab)</span>
                  <IconArrowUpRight size={13} className="-ml-1.5 shrink-0 text-fg-4 transition-[color,transform] duration-200 ease-out-quart group-hover/row:-translate-y-px group-hover/row:translate-x-px group-hover/row:text-fg" />
                </>
              ) : (
                <IconArrowRight size={13} className="-ml-1.5 shrink-0 text-fg-4 transition-[color,transform] duration-200 ease-out-quart group-hover/row:translate-x-0.5 group-hover/row:text-fg" />
              )
            ) : null}
          </>
        );
        const cls =
          'group/row flex items-center gap-4 transition-opacity duration-200 ease-out-quart group-hover/list:opacity-40 hover:opacity-100! focus-visible:opacity-100!';
        return (
          <li key={r.key}>
            {r.href ? (
              r.external ? (
                <a href={r.href} target="_blank" rel="noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link href={r.href} className={cls}>
                  {inner}
                </Link>
              )
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
