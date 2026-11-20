import type { Metadata } from 'next';
import { shots } from '@/content/site';
import { Pad, Section } from '@/components/Blocks';
import { Playground } from '@/components/Playground';
import { Demos } from '@/components/Demos';

export const metadata: Metadata = { title: 'Playground' };

export default function PlaygroundPage() {
  return (
    <>
      <Pad className="pb-12 pt-10 lg:pt-14">
        <h1 className="text-[24px] font-medium tracking-[-0.03em]">Playground</h1>
        <p className="mt-2 text-[14px] text-fg-2">
          Interactions you can play with, all built in code, and interface shots from real projects and side explorations.
        </p>
      </Pad>
      <Section title="Interactions">
        <Demos />
      </Section>
      <Section title="Shots">
        <Playground shots={shots} />
      </Section>

    </>
  );
}
