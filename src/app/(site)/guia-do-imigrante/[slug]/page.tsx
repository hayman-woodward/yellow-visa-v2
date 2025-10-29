import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import DicasENoticias from '@/components/shared/DicasENoticias';
import { getGuiaQuestionHeader } from '@/lib/actions/faq';
import GuiaHeader from './components/GuiaHeader';
import GuiaContent from './components/GuiaContent';
import OutrosDestaques from '../../blog/locais/components/OutrosDestaques';
import { Metadata } from 'next';

interface GDIPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GDIPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guiaData = await getGuiaQuestionHeader(slug);

  if (!guiaData) {
    return {
      title: 'Guia não encontrado | Yellow Visa',
      description: 'O guia solicitado não foi encontrado.',
    };
  }

  return {
    title: `${guiaData.title} | Yellow Visa`,
    description: guiaData.subtitle || `Perguntas frequentes sobre ${guiaData.title} - Guia do Imigrante.`,
    openGraph: {
      title: `${guiaData.title} | Yellow Visa`,
      description: guiaData.subtitle || `Perguntas frequentes sobre ${guiaData.title} - Guia do Imigrante.`,
      images: ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/yv-og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guiaData.title} | Yellow Visa`,
      description: guiaData.subtitle || `Perguntas frequentes sobre ${guiaData.title} - Guia do Imigrante.`,
      images: ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/yv-og-image.jpg'],
    },
  };
}

export default async function GDIPostPage({ params }: GDIPostPageProps) {
  const { slug } = await params;

  // Buscar dados reais do backend pelo slug da PERGUNTA
  const guiaData = await getGuiaQuestionHeader(slug);

  // Se não encontrar dados, mostrar página 404 ou fallback
  if (!guiaData) {
    // Debug log removed
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Guia não encontrado</h1>
          <p className="text-gray-600">O guia solicitado não foi encontrado.</p>
          <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  // Debug log removed

  return (
    <div className='bg-white'>
      <GuiaHeader
        title={guiaData.title}
        subtitle={guiaData.subtitle}
        slug={guiaData.slug}
      />
      <GuiaContent content={guiaData.content} />
      <CTABanner />
      <BeneficiosSection />
      <OutrosDestaques />
    </div>
  );
}
