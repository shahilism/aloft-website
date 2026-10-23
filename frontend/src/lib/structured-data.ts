import { faqs, formattedAddress, site, type Faq, type Service } from '@aloft/content';
import { siteUrl } from './env';

const orgId = `${siteUrl}/#organization`;

/** HVACBusiness markup built only from details ALOFT has published itself. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': orgId,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    url: siteUrl,
    logo: `${siteUrl}/brand/aloft-logo-colour.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    foundingDate: String(site.foundedYear),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      addressCountry: site.contact.address.countryCode,
    },
    areaServed: { '@type': 'State', name: site.contact.serviceArea },
    description: `${site.legalName}: commercial HVAC design, installation and maintenance. ${formattedAddress}.`,
  };
}

export function faqJsonLd(items: Faq[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.intro,
    serviceType: service.name,
    url: `${siteUrl}/services/${service.slug}`,
    provider: { '@id': orgId },
    areaServed: { '@type': 'State', name: site.contact.serviceArea },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
