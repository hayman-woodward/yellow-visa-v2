import type { Metadata } from 'next';
import { Geist, Geist_Mono, Red_Hat_Display } from 'next/font/google';
import './globals.css';
import AOSProvider from '@/components/AOSProvider';
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/integrations/GoogleTagManager';
import SegmentAnalytics from '@/components/integrations/SegmentAnalytics';
import MicrosoftClarity from '@/components/integrations/MicrosoftClarity';
import UTMTracker from '@/components/integrations/UTMTracker';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});
const redHatDisplay = Red_Hat_Display({
  variable: '--heading-family',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yellowvisa.com'),
  title: 'Yellow Visa',
  description: 'Yellow Visa - Simplificamos seu visto',
  openGraph: {
    title: 'Yellow Visa - A única empresa 100% digital em imigração',
    description: 'Descubra vistos, viagens e mobilidade global conosco. Simplificamos o processo de visto e exploramos destinos como Portugal e os EUA.',
    url: 'https://yellowvisa.com',
    siteName: 'Yellow Visa',
    images: [
      {
        url: 'https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/yellowvisa-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yellow Visa - A única empresa 100% digital em imigração',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yellow Visa - A única empresa 100% digital em imigração',
    description: 'Descubra vistos, viagens e mobilidade global conosco. Simplificamos o processo de visto e exploramos destinos como Portugal e os EUA.',
    images: ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/yellowvisa-og-image.jpg'],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const SEGMENT_KEY = process.env.NEXT_PUBLIC_SEGMENT_KEY;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
  
  return (
    <html lang='pt-BR'>
      <head>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        {SEGMENT_KEY && <SegmentAnalytics segmentKey={SEGMENT_KEY} />}
        {CLARITY_ID && <MicrosoftClarity clarityId={CLARITY_ID} />}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redHatDisplay.variable} antialiased`}
      >
        {GTM_ID && <GoogleTagManagerNoScript gtmId={GTM_ID} />}
        <UTMTracker />
        <AOSProvider />
        {children}
      </body>
    </html>
  );
}
