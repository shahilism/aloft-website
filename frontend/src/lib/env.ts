import { site } from '@aloft/content';

const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || site.defaultUrl);

/** API base for browser requests. */
export const publicApiUrl = trimSlash(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');

/** API base for server-side requests (may be an internal hostname). */
export const serverApiUrl = trimSlash(process.env.API_INTERNAL_URL || publicApiUrl);

export const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
export const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === 'true';
