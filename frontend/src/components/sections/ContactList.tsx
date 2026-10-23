import { formattedAddress, site } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

/** Verified contact lines. Icons are Paper on Petrol, Supply on light grounds. */
export function ContactList({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const icon = tone === 'dark' ? 'text-ice' : 'text-supply';
  const link = tone === 'dark' ? 'hover:text-white' : 'hover:text-supply';
  return (
    <ul className={cn('space-y-3.5 text-[0.9375rem]', className)}>
      <li>
        <a href={`tel:${site.contact.phoneE164}`} className={cn('flex items-center gap-3', link)}>
          <Icon name="phone" size={18} className={icon} />
          {site.contact.phoneDisplay}
        </a>
      </li>
      <li>
        <a href={`mailto:${site.contact.email}`} className={cn('flex items-center gap-3', link)}>
          <Icon name="mail" size={18} className={icon} />
          {site.contact.email}
        </a>
      </li>
      <li className="flex items-start gap-3">
        <Icon name="pin" size={18} className={cn('mt-0.5', icon)} />
        <span>
          {formattedAddress}
          <span className="block opacity-80">Serving projects across {site.contact.serviceArea}</span>
        </span>
      </li>
      {site.contact.workingHours && (
        <li className="flex items-center gap-3">
          <Icon name="clock" size={18} className={icon} />
          {site.contact.workingHours}
        </li>
      )}
    </ul>
  );
}
