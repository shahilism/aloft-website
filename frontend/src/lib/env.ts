import { site } from '@aloft/content';

const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || site.defaultUrl);

/**
 * Hosted form endpoint that receives enquiries as JSON (e.g. a Formspree form
 * URL). When unset, the enquiry form hands the message to the visitor's email app.
 */
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';

export const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
export const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true';
