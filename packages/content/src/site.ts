/**
 * Company-wide facts. Contact details are taken from ALOFT's own issued
 * proposals and work orders; confirm them before launch (see README).
 */
export const site = {
  name: 'ALOFT',
  legalName: 'ALOFT Centralized Cooling Solutions',
  tagline: 'Centralized Cooling Solutions',
  supportingLine: 'Design. Install. Maintain.',
  promise: 'Complete cooling for buildings, from concept to continuous operation.',
  foundedYear: 2017,
  defaultUrl: 'https://aloftac.com',
  primaryCta: { label: 'Discuss your project', href: '/contact' },
  contact: {
    phoneDisplay: '+91 95449 27508',
    phoneE164: '+919544927508',
    email: 'aloftac@gmail.com',
    address: {
      locality: 'Perinthalmanna',
      district: 'Malappuram',
      region: 'Kerala',
      countryCode: 'IN',
      country: 'India',
    },
    serviceArea: 'Kerala',
    /** Not yet confirmed by ALOFT — hidden on the site while null. */
    workingHours: null as string | null,
  },
} as const;

export const formattedAddress = `${site.contact.address.locality}, ${site.contact.address.district}, ${site.contact.address.region}, ${site.contact.address.country}`;

export interface NavLink {
  label: string;
  href: string;
}

/** Header navigation, in the reference template's order. */
export const mainNav: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
];

export const footerNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];
