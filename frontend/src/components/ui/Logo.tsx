import Image from 'next/image';
import Link from 'next/link';
import { site } from '@aloft/content';
import { cn } from '@/lib/cn';

/**
 * The official ALOFT lockup, used exactly as supplied (brand boards 03-06):
 * "colour" on white/Paper, "reversed" on Petrol. Never redrawn or recoloured.
 * The source artwork already carries its clear space around the lockup.
 * Minimum on-screen width of the full lockup is 140px; the PNG has ~8% transparent
 * padding per side, so the image itself is never rendered below 168px.
 */
const files = {
  colour: '/brand/aloft-logo-colour.png',
  reversed: '/brand/aloft-logo-reversed.png',
} as const;

// Source files are 1356 x 438.
const RATIO = 438 / 1356;

interface LogoProps {
  variant?: keyof typeof files;
  width?: number;
  className?: string;
  priority?: boolean;
  href?: string | null;
}

export function Logo({ variant = 'colour', width = 180, className, priority, href = '/' }: LogoProps) {
  const w = Math.max(width, 168);
  const img = (
    <Image
      src={files[variant]}
      alt={`${site.name} — ${site.tagline}`}
      width={w}
      height={Math.round(w * RATIO)}
      priority={priority}
      className="h-auto w-full"
      sizes={`${w}px`}
    />
  );
  if (!href) return <span className={cn('block', className)} style={{ width: w }}>{img}</span>;
  return (
    <Link href={href} className={cn('block shrink-0', className)} style={{ width: w }} aria-label={`${site.name} home`}>
      {img}
    </Link>
  );
}
