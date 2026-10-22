import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/common/providers';
import { MobileStickyCta } from '@/components/common/mobile-sticky-cta';
import { Analytics } from '@/components/common/analytics';
import { RevealObserver } from '@/components/common/reveal-observer';
import { REVEAL_BOOT_SCRIPT } from '@/lib/motion';
import { JsonLd } from '@/components/seo/json-ld';
import { APP_CONFIG, SITE_URL } from '@mge/config';
import { organizationSchema, websiteSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Study Abroad Consultants in Coimbatore | Mantra Global Education',
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.metaDescription,
  applicationName: APP_CONFIG.name,
  openGraph: {
    siteName: APP_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#00234E',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT_SCRIPT }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-premium-lg"
        >
          Skip to main content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>
          {children}
          <MobileStickyCta />
          <RevealObserver />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
