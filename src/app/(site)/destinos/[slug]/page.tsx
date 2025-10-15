import BeneficiosSection from '@/components/shared/BeneficiosSection';
import CTABanner from '@/components/shared/CTABanner';
import DicasENoticias from '@/components/shared/DicasENoticias';
import { getDestinoBySlug } from '@/lib/actions/destinos';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DescricaoDestinos from './components/DescricaoDesatinos';
import Diferenciais from '@/components/shared/Diferenciais';
import HeroDestinos from './components/HeroDestinos';
import PrincipaisCidades from './components/PrincipaisCidades';
import RequisitosEspeciais from '@/components/shared/RequisitosEspeciais';

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

  // Preparar dados das cidades
  const cities = [];
  if (destino.city1Title) {
    cities.push({
      id: '1',
      src: destino.city1Image || '/imgs/destinos/galeria-01.jpg',
      alt: destino.city1Title,
      title: destino.city1Title,
      description: destino.city1Description || ''
    });
  }
  if (destino.city2Title) {
    cities.push({
      id: '2',
      src: destino.city2Image || '/imgs/destinos/galeria-02.jpg',
      alt: destino.city2Title,
      title: destino.city2Title,
      description: destino.city2Description || ''
    });
  }
  if (destino.city3Title) {
    cities.push({
      id: '3',
      src: destino.city3Image || '/imgs/destinos/galeria-01.jpg',
      alt: destino.city3Title,
      title: destino.city3Title,
      description: destino.city3Description || ''
    });
  }
  if (destino.city4Title) {
    cities.push({
      id: '4',
      src: destino.city4Image || '/imgs/destinos/galeria-02.jpg',
      alt: destino.city4Title,
      title: destino.city4Title,
      description: destino.city4Description || ''
    });
  }

  // Preparar dados dos diferenciais
  const diferenciais = [];
  if (destino.diferencial1Title) {
    diferenciais.push({
      id: '1',
      src: destino.diferencial1Image || '/imgs/vistos/visto/visto-01.jpg',
      alt: destino.diferencial1Title,
      title: destino.diferencial1Title,
      description: destino.diferencial1Description || ''
    });
  }
  if (destino.diferencial2Title) {
    diferenciais.push({
      id: '2',
      src: destino.diferencial2Image || '/imgs/vistos/visto/visto-02.jpg',
      alt: destino.diferencial2Title,
      title: destino.diferencial2Title,
      description: destino.diferencial2Description || ''
    });
  }
  if (destino.diferencial3Title) {
    diferenciais.push({
      id: '3',
      src: destino.diferencial3Image || '/imgs/vistos/visto/visto-03.jpg',
      alt: destino.diferencial3Title,
      title: destino.diferencial3Title,
      description: destino.diferencial3Description || ''
    });
  }
  if (destino.diferencial4Title) {
    diferenciais.push({
      id: '4',
      src: destino.diferencial4Image || '/imgs/vistos/visto/visto-04.jpg',
      alt: destino.diferencial4Title,
      title: destino.diferencial4Title,
      description: destino.diferencial4Description || ''
    });
  }

  // Preparar dados dos requisitos especiais
  const requisitos = [];
  if (destino.requisito1Title) {
    requisitos.push({
      id: '1',
      icon: destino.requisito1Icon || 'check',
      title: destino.requisito1Title,
      description: destino.requisito1Description || ''
    });
  }
  if (destino.requisito2Title) {
    requisitos.push({
      id: '2',
      icon: destino.requisito2Icon || 'check',
      title: destino.requisito2Title,
      description: destino.requisito2Description || ''
    });
  }
  if (destino.requisito3Title) {
    requisitos.push({
      id: '3',
      icon: destino.requisito3Icon || 'check',
      title: destino.requisito3Title,
      description: destino.requisito3Description || ''
    });
  }
  if (destino.requisito4Title) {
    requisitos.push({
      id: '4',
      icon: destino.requisito4Icon || 'check',
      title: destino.requisito4Title,
      description: destino.requisito4Description || ''
    });
  }
  if (destino.requisito5Title) {
    requisitos.push({
      id: '5',
      icon: destino.requisito5Icon || 'check',
      title: destino.requisito5Title,
      description: destino.requisito5Description || ''
    });
  }
  if (destino.requisito6Title) {
    requisitos.push({
      id: '6',
      icon: destino.requisito6Icon || 'check',
      title: destino.requisito6Title,
      description: destino.requisito6Description || ''
    });
  }
  if (destino.requisito7Title) {
    requisitos.push({
      id: '7',
      icon: destino.requisito7Icon || 'check',
      title: destino.requisito7Title,
      description: destino.requisito7Description || ''
    });
  }
  if (destino.requisito8Title) {
    requisitos.push({
      id: '8',
      icon: destino.requisito8Icon || 'check',
      title: destino.requisito8Title,
      description: destino.requisito8Description || ''
    });
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
      
      {destino.diferenciaisEnabled && (
        <Diferenciais
          diferenciaisTitle={destino.diferenciaisTitle}
          diferenciaisDescription={destino.diferenciaisDescription}
          diferenciais={diferenciais}
        />
      )}

      {destino.requisitosEnabled && (
        <RequisitosEspeciais
          requisitosTitle={destino.requisitosTitle}
          requisitosDescription={destino.requisitosDescription}
          requisitosBreadcrumb={destino.requisitosBreadcrumb}
          requisitosButtonText={destino.requisitosButtonText}
          requisitosButtonUrl={destino.requisitosButtonUrl}
          requisitos={requisitos}
        />
      )}

      {destino.ctaEnabled && (
        <CTABanner
          titulo={destino.ctaTitle}
          texto={destino.ctaDescription}
          buttonText={destino.ctaButtonText}
          buttonLink={destino.ctaButtonUrl}
        />
      )}
      
      {destino.cityEnabled && (
        <PrincipaisCidades
          cityTitle={destino.cityTitle}
          cityDescription={destino.cityDescription}
          cities={cities}
          showButton={false}
        />
      )}
      
      <CTABanner />
      <BeneficiosSection />
      <DicasENoticias />
    </div>
  );
}
