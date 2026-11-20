import Link from 'next/link';

/** Inline link in prose, styled like benji.org (see .basic-link in globals.css). */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith('/') ? (
    <Link href={href} className="basic-link">
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className="basic-link">
      {children}
    </a>
  );
}
