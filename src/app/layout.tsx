import type { Metadata } from 'next';
import { Geist, Geist_Mono, Red_Hat_Display } from 'next/font/google';
import './globals.css';
import AOSProvider from '@/components/AOSProvider';

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
        url: 'https://yellowvisa.com/imgs/yellowvisa-og-image.jpg',
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
    images: ['https://yellowvisa.com/imgs/yellowvisa-og-image.jpg'],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redHatDisplay.variable} antialiased`}
      >
        <AOSProvider />
        {children}
      </body>
    </html>
  );
}
