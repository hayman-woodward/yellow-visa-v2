import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import DicasENoticias from '@/components/shared/DicasENoticias';
import PerguntasFrequentes from '@/components/shared/PerguntasFrequentes';
import HeroDestinos from './components/HeroDestinos';
import { getDestinoBySlug } from '@/lib/actions/destinos';
import DescricaoDestinos from './components/DescricaoDesatinos';
import { Metadata } from 'next';

interface DestinoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DestinoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destino = await getDestinoBySlug(slug);

  if (!destino) {
    return {
      title: 'Destino não encontrado | Yellow Visa',
      description: 'O destino solicitado não foi encontrado.',
    };
  }

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destino não encontrado</h1>
          <p className="text-gray-600">O destino solicitado não foi encontrado.</p>
          <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
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
      <PerguntasFrequentes slug='guia-do-imigrante' />
      <CTABanner />
      <BeneficiosSection />
      <DicasENoticias />
    </div>
  );
}
