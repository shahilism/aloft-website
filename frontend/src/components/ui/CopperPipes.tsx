/**
 * CopperPipes — architectural HVAC refrigerant copper pipes running vertically
 * along the left and right ends of the webpage.
 */
export function CopperPipes() {
  return (
    <>
      {/* Left Copper Pipe */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-50 w-2 sm:w-2.5 md:w-3 select-none"
        style={{
          background: `
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 340px,
              rgba(60, 22, 7, 0.7) 340px,
              rgba(255, 220, 195, 0.95) 342px,
              rgba(140, 55, 22, 0.8) 344px,
              rgba(60, 22, 7, 0.7) 346px,
              transparent 348px
            ),
            linear-gradient(
              to right,
              #4a1c09 0%,
              #783214 12%,
              #b05a30 30%,
              #f5bc98 48%,
              #ffe2d1 52%,
              #cf7342 70%,
              #8c3a16 88%,
              #521f0b 100%
            )
          `,
          boxShadow: '1px 0 6px rgba(10, 52, 66, 0.22), inset -1px 0 1px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Right Copper Pipe */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 z-50 w-2 sm:w-2.5 md:w-3 select-none"
        style={{
          background: `
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 340px,
              rgba(60, 22, 7, 0.7) 340px,
              rgba(255, 220, 195, 0.95) 342px,
              rgba(140, 55, 22, 0.8) 344px,
              rgba(60, 22, 7, 0.7) 346px,
              transparent 348px
            ),
            linear-gradient(
              to right,
              #521f0b 0%,
              #8c3a16 12%,
              #cf7342 30%,
              #ffe2d1 48%,
              #f5bc98 52%,
              #b05a30 70%,
              #783214 88%,
              #4a1c09 100%
            )
          `,
          boxShadow: '-1px 0 6px rgba(10, 52, 66, 0.22), inset 1px 0 1px rgba(0, 0, 0, 0.3)',
        }}
      />
    </>
  );
}
