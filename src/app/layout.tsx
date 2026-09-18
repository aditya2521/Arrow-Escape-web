import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://arrowescape.app'),
  title: 'Arrow Escape — Find the arrow that can escape',
  description:
    'A satisfying logic puzzle with 500 unique arrow levels, milestone trophies, hints, and offline play. Download on the App Store. Coming soon to Google Play.',
  keywords: [
    'Arrow Escape',
    'puzzle game',
    'brain game',
    'unblock puzzle',
    'arrow puzzle',
    'iOS puzzle game',
    'Android puzzle game',
  ],
  openGraph: {
    title: 'Arrow Escape',
    description:
      'Long paths. Clean escapes. 500 unique levels and 25 milestone trophies.',
    type: 'website',
    url: 'https://arrowescape.app',
    siteName: 'Arrow Escape',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrow Escape',
    description: 'Long paths. Clean escapes. 500 unique levels and 25 milestone trophies.',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
