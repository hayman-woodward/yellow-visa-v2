import CTABanner from '@/components/shared/CTABanner';
// import DicasENoticias from '@/components/shared/DicasENoticias';
// import PerguntasFrequentes from '@/components/shared/PerguntasFrequentes';
import BeneficiosSectionHome from './components/BeneficiosSectionHome';
import ComoFunciona from './components/ComoFunciona';
import Destinos from './components/Destinos';
import HeroHome from './components/HeroHome';

import Contadores from '../sobre/components/contadores';
import Vistos from './components/Vistos';

export const metadata = {
  title: 'Yellow Visa — A única empresa 100% digital em imigração',
  description:
    'Descubra vistos, viagens e mobilidade global conosco. Simplificamos o processo de visto e exploramos destinos como Portugal e os EUA, com suporte dedicado e orientação clara do início ao fim.',
};

export default function Home() {
  return (
    <div className='min-h-screen'>
      <HeroHome />
      <Vistos />
      <Destinos />
      <ComoFunciona />     
      {/* <Contadores /> */}
      
      {/* <PerguntasFrequentes slug='guia-do-imigrante' /> */}
      <CTABanner   
        titulo="Seu visto pode estar mais perto do que você imagina"
        texto="Faça sua avaliação personalizada para sua rotina e de o primeiro passo. Vamo nessa?"
        buttonText="Comece agora"
        buttonLink="/comecar?utm_medium=botao-site&utm_source=site-comecar-agora&utm_campaign=botao-site-comecar-agora" />
      <BeneficiosSectionHome />
      
      {/* <DicasENoticias /> */}
    </div>
  );
}
