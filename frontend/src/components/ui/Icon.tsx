import type { SVGProps } from 'react';

/**
 * Line icons on a 24px grid with one round stroke weight, never filled
 * (brand guideline, board 13). Colour follows `currentColor`.
 */
const paths = {
  // Services
  design: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11M12.5 13h5M12.5 16.5h3" />
    </>
  ),
  vrf: (
    <>
      <rect x="2.5" y="5" width="19" height="12.5" rx="2" />
      <circle cx="8.5" cy="11.25" r="3.5" />
      <path d="M8.5 7.75v7M5 11.25h7M15 9h3.5M15 11.25h3.5M15 13.5h3.5M6 17.5v2M18 17.5v2" />
    </>
  ),
  ducting: <path d="M4 4.5h8.5a3.5 3.5 0 0 1 3.5 3.5v11.5h-5.5V10H4zM4 4.5V10M10.5 15h5.5" />,
  'chilled-water': (
    <>
      <path d="M12 3.5c3.6 4.3 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.4-6.2 6-10.5z" />
      <path d="M8.8 14.3c1.07-.95 2.13-.95 3.2 0s2.13.95 3.2 0" />
    </>
  ),
  amc: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4M9 15.2l2 2 4-4" />
    </>
  ),
  // Process and values
  install: (
    <>
      <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  maintain: (
    <path d="M14.8 6.2a4.2 4.2 0 0 0-5.6 5.3L3.8 16.9a1.6 1.6 0 0 0 0 2.3l1 1a1.6 1.6 0 0 0 2.3 0l5.4-5.4a4.2 4.2 0 0 0 5.3-5.6l-2.5 2.5-2.6-.7-.7-2.6z" />
  ),
  brief: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  commission: (
    <>
      <path d="M3.5 17a8.5 8.5 0 1 1 17 0" />
      <path d="M12 17l3.6-4.6M6.4 11.2l1 .8M12 8.5v1.3M17.6 11.2l-1 .8" />
      <circle cx="12" cy="17" r="1.2" />
    </>
  ),
  coordination: (
    <>
      <path d="M12 3.5l9 4.5-9 4.5-9-4.5z" />
      <path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
    </>
  ),
  access: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 3.5v17M11.5 9.5h5M11.5 12.5h5M11.5 15.5h3" />
    </>
  ),
  lifecycle: (
    <>
      <path d="M20 12a8 8 0 0 1-14.2 5M4 12a8 8 0 0 1 14.2-5" />
      <path d="M18.5 3.5V7h-3.5M5.5 20.5V17H9" />
    </>
  ),
  inspection: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3L20.5 20.5M8 10.5l1.8 1.8 3.2-3.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  // Sectors
  office: (
    <>
      <path d="M4 20.5V5a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 15 5v15.5M15 9.5h3.5A1.5 1.5 0 0 1 20 11v9.5M2.5 20.5h19" />
      <path d="M7.5 7.5h4M7.5 11h4M7.5 14.5h4M10 20.5V18" />
    </>
  ),
  coworking: (
    <>
      <rect x="3" y="4" width="8" height="6" rx="1" />
      <rect x="13" y="4" width="8" height="6" rx="1" />
      <path d="M2.5 14h19M5 14v6.5M19 14v6.5M7 10v4M17 10v4" />
    </>
  ),
  education: (
    <>
      <path d="M12 4.5l10 4.5-10 4.5L2 9z" />
      <path d="M6 11v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5M22 9v5" />
    </>
  ),
  hospitality: (
    <>
      <path d="M2.5 19.5V6M2.5 15.5h19v4M21.5 15.5v-3a3 3 0 0 0-3-3h-7.5v6" />
      <circle cx="7" cy="12" r="2" />
    </>
  ),
  retail: (
    <>
      <path d="M5 7.5h14l-1.2 12a1.5 1.5 0 0 1-1.5 1.5H7.7a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10.5 21v-2.5h3V21" />
    </>
  ),
  // Interface
  'arrow-up-right': <path d="M7 17L17 7M8.5 7H17v8.5" />,
  'arrow-right': <path d="M4 12h16M14 6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.7 2.7L16 9.7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4.1-2 1.3a12 12 0 0 0 6.5 6.5l1.3-2 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
  drag: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** Accessible label; omit for decorative icons. */
  title?: string;
}

export function Icon({ name, size = 24, title, strokeWidth = 1.75, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
