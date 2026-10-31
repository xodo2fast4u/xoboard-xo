import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist } from 'next/font/google';
import './globals.css';
import { siteDescription, siteUrl } from '@/lib/site';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display-face',
  display: 'swap',
});
const body = Geist({ subsets: ['latin'], variable: '--font-body-face', display: 'swap' });

const title = 'Xoboard | Free Open Source Android Keyboard';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Xoboard' },
  description: siteDescription,
  applicationName: 'Xoboard',
  keywords: [
    'Xoboard',
    'Android keyboard',
    'Android IME',
    'code-driven keyboard',
    'no XML layouts',
    'zero dependencies',
    'Unicode font styles',
    'clipboard history manager',
    'emoji panel',
    'open source keyboard',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Xoboard',
    title,
    description: siteDescription,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description: siteDescription },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#1c1a17',
  width: 'device-width',
  initialScale: 1,
};

const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Xoboard',
  operatingSystem: 'Android',
  applicationCategory: 'UtilitiesApplication',
  description: siteDescription,
  url: siteUrl,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}).replace(/</g, '\\u003c');

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink-950 font-sans text-ink-100 antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      </body>
    </html>
  );
}
