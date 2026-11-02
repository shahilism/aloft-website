import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Jost } from 'next/font/google';
import Script from 'next/script';
import { home, site } from '@aloft/content';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/JsonLd';
import { MotionProvider } from '@/components/ui/MotionProvider';
import { gaId, gscVerification, siteUrl } from '@/lib/env';
import { organizationJsonLd } from '@/lib/structured-data';
import './globals.css';

const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-jost', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: home.seoTitle, template: `%s | ${site.name}` },
  description: home.metaDescription,
  applicationName: site.legalName,
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  verification: gscVerification ? { google: gscVerification } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0a3442',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${jost.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organizationJsonLd()} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
