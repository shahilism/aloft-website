import { privacyPolicy } from '@aloft/content';
import { LegalPage } from '@/components/sections/LegalPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: privacyPolicy.seoTitle,
  description: privacyPolicy.metaDescription,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return <LegalPage page={privacyPolicy} />;
}
