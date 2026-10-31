import { cn } from '@/lib/cn';

export function DaikinLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" height="32" className={cn('h-8 w-auto fill-current', className)} aria-label="Daikin">
      {/* Daikin geometric triangle emblem */}
      <polygon points="4,4 32,17 4,17" fill="#009FE3" />
      <polygon points="4,20 32,20 22,32 4,32" fill="#003B94" />
      {/* DAIKIN logotype */}
      <text
        x="42"
        y="25"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="22"
        letterSpacing="0.08em"
        fill="currentColor"
      >
        DAIKIN
      </text>
    </svg>
  );
}

export function MitsubishiElectricLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 190 36" height="32" className={cn('h-8 w-auto', className)} aria-label="Mitsubishi Electric">
      {/* Mitsubishi Three Diamonds */}
      <g fill="#E60012">
        <polygon points="18,18 12.8,9 18,0 23.2,9" />
        <polygon points="18,18 12.8,9 18,0 23.2,9" transform="rotate(120 18 18)" />
        <polygon points="18,18 12.8,9 18,0 23.2,9" transform="rotate(240 18 18)" />
      </g>
      {/* Logotype */}
      <g fill="currentColor">
        <text
          x="40"
          y="16"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize="12"
          letterSpacing="0.06em"
        >
          MITSUBISHI
        </text>
        <text
          x="40"
          y="28"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="700"
          fontSize="9.5"
          letterSpacing="0.18em"
          opacity="0.85"
        >
          ELECTRIC
        </text>
      </g>
    </svg>
  );
}

export function CarrierLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 36" height="32" className={cn('h-8 w-auto', className)} aria-label="Carrier">
      <ellipse
        cx="65"
        cy="18"
        rx="60"
        ry="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        transform="rotate(-5 65 18)"
      />
      <text
        x="65"
        y="24"
        textAnchor="middle"
        fontFamily="'Times New Roman', Georgia, serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="22"
        letterSpacing="-0.01em"
        fill="currentColor"
        transform="rotate(-5 65 18)"
      >
        Carrier
      </text>
    </svg>
  );
}

export function VoltasLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" height="32" className={cn('h-8 w-auto', className)} aria-label="Voltas">
      <circle cx="16" cy="18" r="14" fill="#005A9C" />
      <path
        d="M10 13l6 11 6-11"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="currentColor">
        <text
          x="38"
          y="20"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="0.08em"
        >
          VOLTAS
        </text>
        <text
          x="38"
          y="29"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.16em"
          opacity="0.75"
        >
          A TATA ENTERPRISE
        </text>
      </g>
    </svg>
  );
}

export function BlueStarLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 36" height="32" className={cn('h-8 w-auto', className)} aria-label="Blue Star">
      <polygon
        points="16,3 19.5,12.5 29,13 21.5,19 24.5,28 16,22.5 7.5,28 10.5,19 3,13 12.5,12.5"
        fill="#004B9B"
      />
      <g fill="currentColor">
        <text
          x="38"
          y="19"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="0.07em"
        >
          BLUE STAR
        </text>
        <text
          x="38"
          y="29"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.14em"
          opacity="0.75"
        >
          AIR CONDITIONING
        </text>
      </g>
    </svg>
  );
}

export function TraneLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 36" height="32" className={cn('h-8 w-auto', className)} aria-label="Trane">
      <rect x="4" y="5" width="26" height="26" rx="4" fill="#E31837" />
      <circle cx="17" cy="18" r="8" fill="none" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M12 18h10M17 13v10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <text
        x="38"
        y="25"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="21"
        letterSpacing="0.08em"
        fill="currentColor"
      >
        TRANE
      </text>
    </svg>
  );
}

export function YorkLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 36" height="32" className={cn('h-8 w-auto', className)} aria-label="York">
      <rect x="4" y="5" width="26" height="26" rx="3" fill="#005A9C" />
      <text
        x="17"
        y="24"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="18"
        fill="#ffffff"
      >
        Y
      </text>
      <g fill="currentColor">
        <text
          x="38"
          y="20"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="0.08em"
        >
          YORK
        </text>
        <text
          x="38"
          y="29"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="600"
          fontSize="6.5"
          letterSpacing="0.12em"
          opacity="0.75"
        >
          JOHNSON CONTROLS
        </text>
      </g>
    </svg>
  );
}

export function LgLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" height="32" className={cn('h-8 w-auto', className)} aria-label="LG">
      <g transform="translate(2, 3)">
        <circle cx="15" cy="15" r="14" fill="#A50034" />
        <circle cx="10" cy="11" r="1.6" fill="#ffffff" />
        <path d="M15 8v8h4" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 11a8 8 0 1 0 1 7h-5" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <g fill="currentColor">
        <text
          x="40"
          y="21"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="0.04em"
        >
          LG
        </text>
        <text
          x="40"
          y="29"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="600"
          fontSize="6.5"
          letterSpacing="0.12em"
          opacity="0.75"
        >
          AIR CONDITIONING
        </text>
      </g>
    </svg>
  );
}

export function ToshibaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 36" height="32" className={cn('h-8 w-auto', className)} aria-label="Toshiba">
      <text
        x="4"
        y="21"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="19"
        letterSpacing="0.06em"
        fill="#E60012"
      >
        TOSHIBA
      </text>
      <text
        x="4"
        y="30"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="600"
        fontSize="6.5"
        letterSpacing="0.15em"
        fill="currentColor"
        opacity="0.75"
      >
        AIR CONDITIONING
      </text>
    </svg>
  );
}
