'use client';

export default function DividerSystem() {
  return (
    <>
      {/* Vertical dividers: hidden below 1168px to avoid negative positions from fixed 1048px calc */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="relative w-full h-full max-w-[1440px] mx-auto hidden min-[1168px]:block">
          {/* Left vertical divider - 1048px content centered, 60px outside */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-200"
            style={{ left: 'calc((100% - 1048px) / 2 - 60px)' }}
          />
          {/* Right vertical divider */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-200"
            style={{ left: 'calc((100% - 1048px) / 2 + 1048px + 60px)' }}
          />
        </div>
      </div>
    </>
  );
}
