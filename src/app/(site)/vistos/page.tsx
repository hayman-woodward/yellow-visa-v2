import HeroVistos from './components/HeroVistos';
import Banner from './components/banner';

import RequisitosEspeciais from '@/components/shared/RequisitosEspeciais';
import BeneficiosSection from '@/components/shared/BeneficiosSection';
import DicasENoticias from '@/components/shared/DicasENoticias';
// import PerguntasFrequentes from '@/components/shared/PerguntasFrequentes';
import CTABanner from '@/components/shared/CTABanner';
import Vistos from './components/Vistos';
import SimplificamosSeuVisto from './components/SimplicaficamosSeuVisto';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Vistos para EUA e Portugal | Tipos e orientações',
  description:
    'Conheça os principais tipos de visto para Estados Unidos e Portugal e entenda qual caminho combina com seu objetivo.',
};

export default async function Sobre() {
  const vistos = await prisma.visto.findMany({
    where: {
      status: 'published'
    },
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      imageUrl: true,
    }
  });

  return (
    <div className='bg-white'>
      <HeroVistos />
      <Banner />
      <Vistos vistos={vistos} />
      <SimplificamosSeuVisto showButton={false} />
      <RequisitosEspeciais showButton={false} requisitos={[]} />
      {/* <Contadores /> */}
      {/* <PerguntasFrequentes slug='guia-do-imigrante' /> */}
      <CTABanner buttonLink="/comecar" />
      <BeneficiosSection />
      <DicasENoticias />
    </div>
  );
}
