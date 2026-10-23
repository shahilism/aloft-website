import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

/**
 * Pill button with a circular arrow badge, after the reference template.
 * Brand rule: Copper is reserved for the page's primary action
 * ("primary"); everything else uses Petrol or outline styles.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'inverse';

const base =
  'group inline-flex items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-4 text-[0.9375rem] font-medium leading-none whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<ButtonVariant, { button: string; badge: string }> = {
  primary: { button: 'bg-copper text-white hover:bg-copper-dark', badge: 'bg-white text-copper' },
  secondary: { button: 'bg-petrol text-paper hover:bg-[#0d4153]', badge: 'bg-paper text-petrol' },
  outline: {
    button: 'border border-petrol/20 bg-white text-petrol hover:border-petrol/40',
    badge: 'bg-petrol text-paper',
  },
  inverse: { button: 'bg-paper text-petrol hover:bg-white', badge: 'bg-petrol text-paper' },
};

interface CommonProps {
  variant?: ButtonVariant;
  icon?: IconName;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

function Badge({ variant, icon }: { variant: ButtonVariant; icon: IconName }) {
  return (
    <span
      className={cn(
        'grid size-7 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45',
        icon !== 'arrow-up-right' && 'group-hover:rotate-0',
        variants[variant].badge,
      )}
    >
      <Icon name={icon} size={15} strokeWidth={2.25} />
    </span>
  );
}

type ButtonLinkProps = CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children'>;

export function ButtonLink({
  variant = 'secondary',
  icon = 'arrow-up-right',
  fullWidth,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant].button, fullWidth && 'w-full', className)} {...rest}>
      <span>{children}</span>
      <Badge variant={variant} icon={icon} />
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export function Button({
  variant = 'secondary',
  icon = 'arrow-up-right',
  fullWidth,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant].button, fullWidth && 'w-full', className)} {...rest}>
      <span className={cn(fullWidth && 'flex-1 text-center')}>{children}</span>
      <Badge variant={variant} icon={icon} />
    </button>
  );
}
