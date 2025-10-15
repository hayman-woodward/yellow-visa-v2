import CTABanner from '@/components/shared/CTABanner';
import { getVistoBySlug } from '@/lib/actions/vistos';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DescricaoVisto from './components/DescricaoVisto';
import Diferenciais from '@/components/shared/Diferenciais';
import HeroVistos from './components/HeroVistos';
import OutrosVistos from './components/OutrosVistos';
import PrincipaisCidades from './components/PrincipaisCidades';
import VistoBanner from './components/VistoBanner';
import VistoBeneficios from './components/VistoBeneficios';
import VistoFAQ from './components/VistoFAQ';
import VistoVideo from './components/VistoVideo';
import RequisitosEspeciais from '@/components/shared/RequisitosEspeciais';

interface VistoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: VistoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const visto = await getVistoBySlug(slug);

  if (!visto) notFound();

  return {
    title: visto.metaTitle || `${visto.title} | Yellow Visa`,
    description: visto.metaDescription || visto.description,
    openGraph: {
      title: visto.ogTitle || visto.title,
      description: visto.ogDescription || visto.description,
      images: visto.ogImage ? [visto.ogImage] : ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/og-image.png'],
    },
    twitter: {
      title: visto.twitterTitle || visto.title,
      description: visto.twitterDescription || visto.description,
      images: visto.twitterImage ? [visto.twitterImage] : ['https://vff5ghjtlyibstii.public.blob.vercel-storage.com/uploads/og-image.png'],
    },
  };
}

export default async function VistoPage({ params }: VistoPageProps) {
  const { slug } = await params;

  // Buscar dados do visto
  const visto = await getVistoBySlug(slug);

  // Se não encontrar o visto, mostrar página 404
  if (!visto) {
    notFound();
  }



  // Preparar dados das cidades
  const cities = [];
  if (visto.city1Title) {
    cities.push({
      id: '1',
      src: visto.city1Image || '/imgs/vistos/visto/visto-01.jpg',
      alt: visto.city1Title,
      title: visto.city1Title,
      description: visto.city1Description || ''
    });
  }
  if (visto.city2Title) {
    cities.push({
      id: '2',
      src: visto.city2Image || '/imgs/vistos/visto/visto-01.jpg',
      alt: visto.city2Title,
      title: visto.city2Title,
      description: visto.city2Description || ''
    });
  }
  if (visto.city3Title) {
    cities.push({
      id: '3',
      src: visto.city3Image || '/imgs/vistos/visto/visto-01.jpg',
      alt: visto.city3Title,
      title: visto.city3Title,
      description: visto.city3Description || ''
    });
  }
  if (visto.city4Title) {
    cities.push({
      id: '4',
      src: visto.city4Image || '/imgs/vistos/visto/visto-01.jpg',
      alt: visto.city4Title,
      title: visto.city4Title,
      description: visto.city4Description || ''
    });
  }

  // Preparar dados do FAQ
  const faqItems = [];
  if (visto.faq1Question && visto.faq1Answer) {
    faqItems.push({
      question: visto.faq1Question,
      answer: visto.faq1Answer
    });
  }
  if (visto.faq2Question && visto.faq2Answer) {
    faqItems.push({
      question: visto.faq2Question,
      answer: visto.faq2Answer
    });
  }
  if (visto.faq3Question && visto.faq3Answer) {
    faqItems.push({
      question: visto.faq3Question,
      answer: visto.faq3Answer
    });
  }
  if (visto.faq4Question && visto.faq4Answer) {
    faqItems.push({
      question: visto.faq4Question,
      answer: visto.faq4Answer
    });
  }
  if (visto.faq5Question && visto.faq5Answer) {
    faqItems.push({
      question: visto.faq5Question,
      answer: visto.faq5Answer
    });
  }
  if (visto.faq6Question && visto.faq6Answer) {
    faqItems.push({
      question: visto.faq6Question,
      answer: visto.faq6Answer
    });
  }

  // Preparar dados dos diferenciais
  const diferenciais = [];
  if (visto.diferencial1Title) {
    diferenciais.push({
      id: '1',
      src: visto.diferencial1Image || '/imgs/vistos/visto/visto-01.jpg',
      alt: visto.diferencial1Title,
      title: visto.diferencial1Title,
      description: visto.diferencial1Description || ''
    });
  }
  if (visto.diferencial2Title) {
    diferenciais.push({
      id: '2',
      src: visto.diferencial2Image || '/imgs/vistos/visto/visto-02.jpg',
      alt: visto.diferencial2Title,
      title: visto.diferencial2Title,
      description: visto.diferencial2Description || ''
    });
  }
  if (visto.diferencial3Title) {
    diferenciais.push({
      id: '3',
      src: visto.diferencial3Image || '/imgs/vistos/visto/visto-03.jpg',
      alt: visto.diferencial3Title,
      title: visto.diferencial3Title,
      description: visto.diferencial3Description || ''
    });
  }
  if (visto.diferencial4Title) {
    diferenciais.push({
      id: '4',
      src: visto.diferencial4Image || '/imgs/vistos/visto/visto-04.jpg',
      alt: visto.diferencial4Title,
      title: visto.diferencial4Title,
      description: visto.diferencial4Description || ''
    });
  }

  // Debug: Log dos diferenciais para verificar se estão sendo carregados
  console.log('Diferenciais carregados:', diferenciais.length);
  console.log('Diferencial 3 title:', visto.diferencial3Title);
  console.log('Diferencial 4 title:', visto.diferencial4Title);


  // Preparar dados dos benefícios
  const beneficios = [];
  if (visto.beneficio1Title && visto.beneficio1Description) {
    beneficios.push({
      icon: visto.beneficio1Icon || '',
      title: visto.beneficio1Title,
      description: visto.beneficio1Description
    });
  }
  if (visto.beneficio2Title && visto.beneficio2Description) {
    beneficios.push({
      icon: visto.beneficio2Icon || '',
      title: visto.beneficio2Title,
      description: visto.beneficio2Description
    });
  }
  if (visto.beneficio3Title && visto.beneficio3Description) {
    beneficios.push({
      icon: visto.beneficio3Icon || '',
      title: visto.beneficio3Title,
      description: visto.beneficio3Description
    });
  }

  // Preparar dados dos requisitos especiais
  const requisitos = [];
  for (let i = 1; i <= 8; i++) {
    const title = visto[`requisito${i}Title` as keyof typeof visto] as string;
    const description = visto[`requisito${i}Description` as keyof typeof visto] as string;
    const icon = visto[`requisito${i}Icon` as keyof typeof visto] as string;
    
    if (title && description) {
      requisitos.push({
        icon: icon || '',
        title,
        description
      });
    }
  }

  return (
    <div className='bg-white min-h-screen'>
      {visto.bannerEnabled ? (
        <VistoBanner
          title={visto.title}
          slug={visto.slug}
          bannerTitle={visto.bannerTitle}
          bannerDescription={visto.bannerDescription}
          bannerButtonText={visto.bannerButtonText}
          bannerButtonUrl={visto.bannerButtonUrl}
          imageUrl={visto.imageUrl}
        />
      ) : (
        <HeroVistos
          title={visto.title}
          slug={visto.slug}
          bannerTitle={visto.bannerTitle}
          imageUrl={visto.imageUrl}
        />
      )}
      <DescricaoVisto
        excerpt={visto.excerpt}
        content={visto.content}
      />
    
      {visto.diferenciaisEnabled && (
        <Diferenciais
          diferenciaisTitle={visto.diferenciaisTitle || "Todo mundo promete o mesmo. A gente entrega diferente"}
          diferenciaisDescription={visto.diferenciaisDescription}
          diferenciais={diferenciais}
        />
      )}

      {visto.requisitosEnabled && (
        <RequisitosEspeciais
          requisitosTitle={visto.requisitosTitle || "A gente acredita em soluções que cabem na vida real"}
          requisitosDescription={visto.requisitosDescription}
          requisitosBreadcrumb={visto.requisitosBreadcrumb || "ESPECIAIS"}
          requisitosButtonText={visto.requisitosButtonText || "Conheça todos os requisitos especiais"}
          requisitosButtonUrl={visto.requisitosButtonUrl || "/requisitos"}
          requisitos={requisitos}
        />
      )}
     
      {visto.cityEnabled && (
        <PrincipaisCidades
          cityTitle={visto.cityTitle}
          cityDescription={visto.cityDescription}
          cities={cities}
        />
      )}
      <VistoVideo
        videoUrl={visto.videoUrl}
        title={visto.title}
      />
      <OutrosVistos currentSlug={slug} />
      {/* <HistoriasImigracao /> */}
      {visto.faqEnabled && (
        <VistoFAQ
          faqTitle={visto.faqTitle}
          faqDescription={visto.faqDescription}
          faqItems={faqItems}
          vistoSlug={slug}
        />
      )}
      <CTABanner 
      
        titulo={visto.ctaTitle || 'Descubra o melhor caminho para viver fora'}
        texto={visto.ctaDescription || 'Leva menos de 2 minutos. Sem compromisso. Totalmente gratuito e personalizado para você.'}
        buttonText={visto.ctaButtonText || 'Comece agora'}
        buttonLink={visto.ctaButtonUrl || '/comecar'}
      />
      {visto.beneficiosEnabled && (
        <VistoBeneficios beneficios={beneficios} />
      )}
      {/* <DicasENoticias /> */}
    </div>
  );
}
