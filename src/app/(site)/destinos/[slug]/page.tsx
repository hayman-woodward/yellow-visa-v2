import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import DicasENoticias from '@/components/shared/DicasENoticias';
import PerguntasFrequentes from '@/components/shared/PerguntasFrequentes';
import HeroDestinos from './components/HeroDestinos';
import { getDestinoBySlug } from '@/lib/actions/destinos';
import DescricaoDestinos from './components/DescricaoDesatinos';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface DestinoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DestinoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destino = await getDestinoBySlug(slug);

  if (!destino) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yellowvisa.netlify.app';
  const ogImage = destino.imageUrl || `${baseUrl}/imgs/destinos/destinos-banner.jpg`;

  return {
    title: `${destino.name} | Yellow Visa`,
    description: destino.description || `Informações sobre ${destino.name} - viver, estudar e trabalhar.`,
    openGraph: {
      title: `${destino.name} | Yellow Visa`,
      description: destino.description || `Informações sobre ${destino.name} - viver, estudar e trabalhar.`,
      url: `${baseUrl}/destinos/${destino.slug}`,
      siteName: 'Yellow Visa',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: destino.name,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${destino.name} | Yellow Visa`,
      description: destino.description || `Informações sobre ${destino.name} - viver, estudar e trabalhar.`,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/destinos/${destino.slug}`,
    },
  };
}

export default async function DestinoPage({ params }: DestinoPageProps) {
  const { slug } = await params;

  const destino = await getDestinoBySlug(slug);

  if (!destino) {
    notFound();
  }

  return (
    <div className='bg-white min-h-screen'>
      <HeroDestinos 
        title={destino.name}
        slug={destino.slug}
        bannerTitle={destino.bannerTitle || destino.name}
        imageUrl={destino.imageUrl}
      /> 
      <DescricaoDestinos
        excerpt={destino.description}
        content={destino.content}
      />
      
      <CTABanner />
      <BeneficiosSection />
      <DicasENoticias />
    </div>
  );
}
