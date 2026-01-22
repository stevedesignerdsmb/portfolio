import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const ppNeueMontreal = localFont({
  src: [
    {
      path: './fonts/PPNeueMontreal-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-SemiBolditalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/PPNeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/PPNeueMontreal-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-pp-neue-montreal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Steve Calderon - Portfolio',
  description: 'I bring products to life through design and code',
  openGraph: {
    title: 'Steve Calderon - Portfolio',
    description: 'I bring products to life through design and code',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ppNeueMontreal.variable} antialiased`}>{children}</body>
    </html>
  );
}
