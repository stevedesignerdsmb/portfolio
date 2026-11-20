/** Name set letter by letter so it can resolve from blur on load. */
export function HeroName({ first, second }: { first: string; second: string }) {
  let i = 0;
  const letters = (word: string) =>
    Array.from(word).map((ch) => {
      const d = i++ * 18;
      return (
        <span key={`${word}-${d}`} className="letter" style={{ animationDelay: `${d}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      );
    });
  return (
    <h1 className="text-[28px] font-medium leading-[1.12] tracking-[-0.028em] sm:text-[32px]">
      <span className="sr-only">
        {first}, {second}
      </span>
      <span aria-hidden className="block text-fg">
        {letters(first)}
      </span>
      <span aria-hidden className="block text-fg-3">
        {letters(second)}
      </span>
    </h1>
  );
}
