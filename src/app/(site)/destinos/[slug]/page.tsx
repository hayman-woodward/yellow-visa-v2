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

  return {
    title: `${destino.name} | Yellow Visa`,
    description: destino.description || `Informações sobre ${destino.name} - viver, estudar e trabalhar.`,
    openGraph: {
      title: `${destino.name} | Yellow Visa`,
      description: destino.description || `Informações sobre ${destino.name} - viver, estudar e trabalhar.`,
      images: ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${destino.name} | Yellow Visa`,
      description: destino.description || `Informações sobre ${destino.name} - viver, estudar e trabalhar.`,
      images: ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/og-image.png'],
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
