import { Fragment } from 'react';
import { TextLink } from './TextLink';
import { Highlight } from './Highlight';

/**
 * Placeholder copy. Rendered as plain text so the page reads as final; the
 * [[…]] brackets in src/content stay the record of what still needs Steve.
 * Find them with:  grep -rn "\[\[" src
 */
export function TK({ children }: { children: React.ReactNode }) {
  return <span data-tk="">{children}</span>;
}

/**
 * Renders a string: [[…]] become <TK> markers, [label](url) links, **text** a highlight,
 * ((text)) a highlighter pass over the key line (one per case study read).
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]*\]\]|\(\([^)]+\)\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  // A full stop right after a highlight joins it, so the marker covers the whole sentence.
  const trail: Record<number, string> = {};
  parts.forEach((p, i) => {
    if (p.startsWith('((') && /^\./.test(parts[i + 1] ?? '')) {
      trail[i] = parts[i + 1][0];
      parts[i + 1] = parts[i + 1].slice(1);
    }
  });
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('[[')) return <TK key={i}>{p.slice(2, -2)}</TK>;
        if (p.startsWith('((') && p.endsWith('))')) {
          return <Highlight key={i}>{p.slice(2, -2) + (trail[i] ?? '')}</Highlight>;
        }
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className="font-[560] text-fg">{p.slice(2, -2)}</strong>;
        const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) return <TextLink key={i} href={link[2]}>{link[1]}</TextLink>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export const isTK = (s: string) => s.startsWith('[[');
