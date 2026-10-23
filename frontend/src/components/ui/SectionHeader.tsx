import type { ReactNode } from 'react';
import type { ButtonVariant } from './Button';
import { ButtonLink } from './Button';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  button?: { label: string; href: string; variant?: ButtonVariant };
  /** Heading level: h1 for page heroes, h2 for sections. */
  as?: 'h1' | 'h2';
  id?: string;
}

/**
 * The reference template's section opener: label, heading and button on the
 * left; a short paragraph aligned bottom-right on wide screens.
 */
export function SectionHeader({ eyebrow, title, body, button, as: Heading = 'h2', id }: SectionHeaderProps) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
      <div className="md:col-span-7">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <Heading id={id} className={Heading === 'h1' ? 'type-display' : 'type-headline'}>
          {title}
        </Heading>
        {button && (
          <div className="mt-7 hidden md:block">
            <ButtonLink href={button.href} variant={button.variant ?? 'secondary'}>
              {button.label}
            </ButtonLink>
          </div>
        )}
      </div>
      {(body || button) && (
        <div className="md:col-span-5 md:pb-2 md:text-right">
          {body && <div className="type-body md:ml-auto md:max-w-[22rem]">{body}</div>}
          {button && (
            <div className="mt-6 md:hidden">
              <ButtonLink href={button.href} variant={button.variant ?? 'secondary'}>
                {button.label}
              </ButtonLink>
            </div>
          )}
        </div>
      )}
    </Reveal>
  );
}
