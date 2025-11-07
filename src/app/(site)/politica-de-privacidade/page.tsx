import { YVText, YVTitle, YVIcon } from '@/components/YV';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | Yellow Visa',
  description: 'Política de privacidade da Yellow Visa. Saiba como coletamos, usamos e protegemos suas informações pessoais.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className='min-h-screen bg-[#f7f5f6] relative'>
      {/* SVG Background - Desktop - Por cima do conteúdo, mas por baixo do título */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none hidden lg:block z-[2]' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src='/svgs/laco-politica.svg'
          alt='Política de Privacidade'
          width={1440}
          height={758}
          className='w-screen max-w-none'
          priority
        />
      </div>

      {/* Hero Section */}
      <div className='-mt-[88px] relative w-full overflow-hidden bg-[#f7f5f6]'>
        {/* Conteúdo do Hero */}
        <div className='relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[308px] z-[4]'>
          <div className='flex flex-col gap-[40px] items-start justify-end pb-5 pt-[160px]'>
            {/* Botão Voltar */}
            <Link 
              href="/blog"
              className="text-sm inline-flex items-center gap-2 text-[#0f0005] hover:text-gray-600 transition-colors duration-200 font-extrabold group py-[12px] relative z-[5]"
            >
              <YVIcon 
                name="arrow-left" 
                width={16} 
                height={16}
                className="group-hover:opacity-80 transition-opacity duration-200"
              />
              Voltar para Notícias
              <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc0044] w-0 group-hover:w-full transition-all duration-300' />
            </Link>

            {/* Título */}
            <div className='flex flex-col gap-[24px] items-start relative w-full max-w-[824px] z-[5]'>
              <div className='pr-[104px]'>
                <YVTitle 
                  tag="h1" 
                  variant='heading'
                  className='!text-[42px] !leading-[48px] !tracking-[-0.5px] !font-normal pb-4 text-[#0f0005] noPadding'
                >
                  Política de Privacidade
                </YVTitle>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[308px] py-[20px] z-[3]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[16px] relative">
            <YVTitle 
              variant="heading"
              className="!text-[42px] !leading-[48px] !tracking-[-0.5px] !font-normal pb-4 text-[#0f0005] noPadding relative z-[4]"
            >
              Introdução
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              A Yellow Visa está comprometida em proteger sua privacidade. Esta política de privacidade explica como coletamos, usamos e compartilhamos suas informações pessoais.
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Coleta de Informações
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              Coletamos informações pessoais quando você usa nosso aplicativo. Essas informações podem incluir seu nome, endereço de e-mail, número de telefone e informações de perfil.
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Uso de Informações
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              Usamos suas informações pessoais para fornecer a você o aplicativo e os serviços que você solicitou. Também podemos usar suas informações pessoais para: Manter você atualizado sobre nossos produtos e serviços; Responder às suas perguntas e solicitações; Analisar o uso do aplicativo para melhorar seus recursos e serviços; Enviar comunicações de marketing, como e-mails promocionais; Cumprir com as leis e regulamentos aplicáveis.
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Compartilhamento de Informações
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias: Com nossos parceiros de negócios que nos ajudam a fornecer o aplicativo e os serviços que você solicitou; Para cumprir com a lei ou para cumprir uma ordem judicial; Para proteger os direitos, propriedade ou segurança da Yellow Visa, nossos usuários ou terceiros.
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Seus Direitos
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para fazer isso, entre em contato conosco pelo e-mail [email protected]
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Segurança
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              A Yellow Visa usa medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, uso ou divulgação.
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Concordância
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              Ao usar o aplicativo Yellow Visa, você concorda com esta política de privacidade.
            </YVText>

            <YVTitle 
              variant="subtitle" 
              className="!text-[22px] !leading-[28px] !tracking-[-0.5px] !font-semibold !pb-2 text-[#0f0005] noPadding"
            >
              Atualizações
            </YVTitle>
            <YVText className="!text-[16px] !leading-[22px] !pb-2 text-[#0f0005] !font-normal">
              Podemos atualizar esta política de privacidade de tempos em tempos. Se fizermos alterações significativas, notificaremos você por e-mail ou por meio de um aviso no aplicativo.
            </YVText>
          </div>
        </div>
      </div>
    </div>
  );
}

