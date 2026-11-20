import { MapPin } from '@phosphor-icons/react/dist/ssr';
import { site } from '@/content/site';

/**
 * Where I'm based, in the slot the greeting and clock used to fill. A live
 * clock is page furniture; the city is a fact a recruiter actually uses.
 * Static, so it renders on the server and nothing shifts after mount.
 */
export function Greeting() {
  return (
    <p className="flex h-5 items-center gap-1.5 text-[13px] leading-5 text-fg-3">
      <MapPin size={14} weight="fill" aria-hidden />
      Based in {site.location}, {site.country}
    </p>
  );
}
