/**
 * SMB.co's cover: the whole app at the scan step (sidebar, conversation and
 * the map), set in a grey well and running off its right and bottom edges, so
 * it reads as a real product at a glance. Always the dark capture, in
 * either site theme (Steve's call, Nov 20 2026).
 */
export function SmbCover() {
  return (
    <div className="sm-cover relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface-2 shadow-ring">
      <div className="sm-cover-shot absolute left-[7%] top-[9%] w-[110%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/smb/cover-dark.jpg" alt="SMB.co checking how AI assistants see Riverbend Coffee, on a 3D map" className="block w-full" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
