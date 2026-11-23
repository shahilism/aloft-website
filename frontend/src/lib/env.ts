import { site } from '@aloft/content';

const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || site.defaultUrl);

/**
 * Hosted form endpoint that receives enquiries as JSON and emails them to ALOFT.
 * Defaults to FormSubmit delivering to the site's contact email. Set it to another
 * service (e.g. a Formspree form URL) to override, or to an empty string to fall
 * back to opening the visitor's email app.
 */
export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? `https://formsubmit.co/ajax/${site.contact.email}`;

export const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
export const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true';
