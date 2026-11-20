import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/Shell';
import { site } from '@/content/site';
import { themeScript } from '@/components/ThemeSwitch';
import { SoundBinder } from '@/components/Sound';

// Inter, variable: lets body text sit at 460 (between regular and medium), as on benji.org.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  keywords: ['design engineer', 'product designer', 'UI engineer', 'interaction design', 'fintech', 'marketplaces', 'Next.js', 'SwiftUI'],
  openGraph: { title, description: site.description, url: site.url, siteName: site.name, type: 'profile', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description: site.description, creator: '@stevedesignerd' },
  robots: { index: true, follow: true },
};

/** Structured data so search engines and AI assistants can identify who this is. */
const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  image: `${site.url}/portfolio_pic.jpg`,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Guadalajara', addressCountry: 'MX' },
  sameAs: [site.linkedin, site.x],
  knowsAbout: ['AI agent interfaces', 'Conversational UI', 'Product design', 'Design engineering', 'Interaction design', 'Design systems', 'Front-end development', 'Fintech', 'Marketplaces'],
  worksFor: { '@type': 'Organization', name: 'Kiiex', url: 'https://kiiex.io' },
  alumniOf: [
    { '@type': 'Organization', name: 'Mercado Libre', url: 'https://www.mercadolibre.com' },
    { '@type': 'Organization', name: 'SMB.co', url: 'https://smb.co' },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#131316' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-fg focus:shadow-lift"
        >
          Skip to content
        </a>
        <SoundBinder />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
