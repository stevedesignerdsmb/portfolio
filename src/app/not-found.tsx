import { Button, Pad } from '@/components/Blocks';

export default function NotFound() {
  return (
    <Pad className="py-24">
      <p className="tabular text-[14px] text-fg-3">404</p>
      <h1 className="mt-2 text-[22px] font-medium tracking-[-0.02em]">This page doesn’t exist.</h1>
      <p className="mt-2 text-[14px] text-fg-2">It may have moved during the redesign.</p>
      <div className="mt-6">
        <Button href="/">Back to the index</Button>
      </div>
    </Pad>
  );
}
