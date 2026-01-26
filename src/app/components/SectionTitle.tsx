'use client';

interface SectionTitleProps {
  children: React.ReactNode;
}

const DOT_BOX_SHADOW =
  '0 20px 20px -10px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 10px 10px -5px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 6px 6px -3px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 3px 3px -1.5px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 1px 1px -0.5px var(--shadow-gray-shadow-4, rgba(23, 23, 23, 0.04)), 0 0 0 1px var(--shadow-gray-shadow-8, rgba(23, 23, 23, 0.08)), 0 -1px 1px -0.5px var(--shadow-gray-shadow-6, rgba(23, 23, 23, 0.06)) inset';

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="relative my-16 -mx-5 px-5">
      <div className="max-w-[1440px] mx-auto relative">
        <div
          className="relative flex w-full items-center justify-center gap-0"
          style={{ minHeight: '24px' }}
        >
          {/* Mobile (< 1168px): flex lines, full width, no dots */}
          <div
            className="flex-1 h-px shrink-0 bg-gray-200 min-[1168px]:hidden"
            aria-hidden
          />
          {/* Title - always centered */}
          <h2
            className="shrink-0 px-4 text-base font-medium text-center text-text-soft-400 relative z-10"
            style={{ backgroundColor: 'var(--bg-weak-25)' }}
          >
            {children}
          </h2>
          <div
            className="flex-1 h-px shrink-0 bg-gray-200 min-[1168px]:hidden"
            aria-hidden
          />

          {/* Desktop (>= 1168px): lines end at vertical dividers, no overflow */}
          <div
            className="absolute top-1/2 hidden h-px -translate-y-1/2 bg-gray-200 min-[1168px]:block"
            style={{
              left: 'calc((100% - 1048px) / 2 - 60px)',
              right: 'calc(50% + 24px)',
            }}
            aria-hidden
          />
          <div
            className="absolute top-1/2 hidden h-px -translate-y-1/2 bg-gray-200 min-[1168px]:block"
            style={{
              left: 'calc(50% + 24px)',
              right: 'calc(100% - ((100% - 1048px) / 2 + 1048px + 60px))',
            }}
            aria-hidden
          />

          {/* Desktop: junction dots at vertical divider intersections */}
          <div
            className="absolute top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 min-[1168px]:block"
            style={{ left: 'calc((100% - 1048px) / 2 - 60px)' }}
            aria-hidden
          >
            <div
              className="h-2 w-2 rounded-[2px] bg-white"
              style={{ boxShadow: DOT_BOX_SHADOW }}
            />
          </div>
          <div
            className="absolute top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 min-[1168px]:block"
            style={{ left: 'calc((100% - 1048px) / 2 + 1048px + 60px)' }}
            aria-hidden
          >
            <div
              className="h-2 w-2 rounded-[2px] bg-white"
              style={{ boxShadow: DOT_BOX_SHADOW }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
