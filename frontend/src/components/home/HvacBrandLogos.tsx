import Image from 'next/image';
import { cn } from '@/lib/cn';

export function DaikinLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/daikin-logo_brandlogos.net_33sx6.png"
      alt="Daikin"
      width={723}
      height={176}
      className={cn('h-7 w-auto object-contain', className)}
    />
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
    <Image
      src="/brand/voltas-logo_brandlogos.net_rmdfr.png"
      alt="Voltas"
      width={973}
      height={216}
      className={cn('h-7 w-auto object-contain', className)}
    />
  );
}

export function GeneralLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/general-inc.-logo.png"
      alt="General"
      width={2512}
      height={320}
      className={cn('h-7 w-auto object-contain', className)}
    />
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
    <Image
      src="/brand/trane-logo-brandlogos.net-qm4h7.png"
      alt="Trane"
      width={2027}
      height={721}
      className={cn('h-7 w-auto object-contain', className)}
    />
  );
}

export function LgLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/lg_corporation-logo_brandlogos.net_whn9s.png"
      alt="LG"
      width={1454}
      height={623}
      className={cn('h-7 w-auto object-contain', className)}
    />
  );
}

export function ToshibaLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/toshiba-logo_brandlogos.net_v3x3p.png"
      alt="Toshiba"
      width={911}
      height={164}
      className={cn('h-7 w-auto object-contain', className)}
    />
  );
}
