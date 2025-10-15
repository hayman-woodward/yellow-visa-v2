import CTABanner from '@/components/shared/CTABanner';
import Banner from './components/banner';
import Contadores from './components/contadores';

import BeneficiosSectionSobre from './components/BeneficiosSectionSobre';
import HeroSobre from './components/heroSobre';
import NossaMissao from './components/nossa-missao';
import NossoTime from './components/nosso-time';
import SobreNos from './components/sobre-nos';

export const metadata = {
  title: 'Sobre a Yellow Visa | Quem somos e nossa missão',
  description:
    'Conheça a Yellow Visa: consultoria de imigração com abordagem humana, transparente e eficiente para EUA e Portugal.',
};


export default function Sobre() {
  return (
    <div className='min-h-screen bg-white'>
      <HeroSobre />
      <SobreNos />

      <NossaMissao />
      <Banner />
      <NossoTime />

      <Contadores />
      {/* <PerguntasFrequentes slug='guia-do-imigrante' /> */}
      <CTABanner titulo="Seu visto pode estar mais perto do que você imagina"
        texto="Faça sua avaliação gratuita 100% personalizada para sua rotina e dê o primeiro passo. Vamos nessa?"
        buttonText="Comece agora"
        buttonLink="/comecar" />
      <BeneficiosSectionSobre />
      {/* <DicasENoticias /> */}
    </div>
  );
}
