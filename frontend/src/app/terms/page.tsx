import { termsOfService } from '@aloft/content';
import { LegalPage } from '@/components/sections/LegalPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: termsOfService.seoTitle,
  description: termsOfService.metaDescription,
  path: '/terms',
});

export default function TermsPage() {
  return <LegalPage page={termsOfService} />;
}
