import { YVContainer, YVGrid, YVText, YVTitle } from '@/components/YV';
import Image from 'next/image';

export const metadata = {
  title: 'Política de Privacidade | Yellow Visa',
  description: 'Política de privacidade da Yellow Visa. Saiba como coletamos, usamos e protegemos suas informações pessoais.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className='min-h-screen bg-white'>
   
   <div className=' max-h-[700px] -mt-[88px] relative w-full overflow-hidden'>
      {/* SVG Background - Desktop */}
      <div className='absolute inset-0 pointer-events-none hidden lg:block' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src='/svgs/laco-politica.svg'
          alt='Política de Privacidade'
          width={1440}
          height={758}
          className='w-full h-full object-cover '
          priority
        />
      </div>

      {/* Imagem Mobile Background */}
      <div className='absolute inset-0 pointer-events-none lg:hidden' data-aos="fade-in" data-aos-duration="2000">
        <Image
          src='/imgs/home/yellow-visa-hero-mobile.png'
          alt='Mulher com cabelo colorido - Mobile'
          width={400}
          height={700}
          className='w-full h-full object-cover object-center'
          style={{ objectPosition: 'center top' }}
          priority
        />
        {/* Overlay escuro para melhorar legibilidade do texto */}
        <div
          className='absolute bottom-0 left-0 right-0 h-5/5'
          style={{
            background:
              'linear-gradient(180deg, var(--overlay-0, rgba(15, 0, 5, 0.00)) 40.06%, var(--overlay-36, rgba(15, 0, 5, 0.50)) 50%)'
          }}
        />
      </div>

      {/* Conteúdo do Hero */}
      <div className='relative z-10 w-full max-w-[1248px]  m-auto px-5 sm:px-6 lg:px-8 xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 max-h-[600px] md:max-h-[800px] h-[90vh] py-0'>
          {/* Coluna Esquerda - Texto */}
          <div className='flex flex-col lg:ml-20 max-w-[300px] md:max-w-[520px] md:pr-20 justify-end md:justify-center  md:pb-[80px] md:mt-20 relative z-20 '>
           
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1400" className='md:mt-15'>
              <YVTitle
                tag="h1"
                variant='hero'
                className='text-4xl lg:text-5xl xl:text-6xl font-bold text-white md:text-gray-900 leading-tight mb-10'
              >
               Política de Privacidade
              </YVTitle>
            </div>           
          </div>       
        </div>
      </div>
    </div>

    {/* Conteúdo */}
    <div className="w-full px-5 sm:px-6 lg:px-[308px] py-5 lg:py-10">
      <div className="flex flex-col gap-4">
        <YVTitle className="pb-4">Introdução</YVTitle>
        <YVText className="pb-2">
          A Yellow Visa está comprometida em proteger sua privacidade. Esta política de privacidade explica como coletamos, usamos e compartilhamos suas informações pessoais.
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Coleta de Informações</YVTitle>
        <YVText className="pb-2">
          Coletamos informações pessoais quando você usa nosso aplicativo. Essas informações podem incluir seu nome, endereço de e-mail, número de telefone e informações de perfil.
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Uso de Informações</YVTitle>
        <YVText className="pb-2">
          Usamos suas informações pessoais para fornecer a você o aplicativo e os serviços que você solicitou. Também podemos usar suas informações pessoais para: Manter você atualizado sobre nossos produtos e serviços; Responder às suas perguntas e solicitações; Analisar o uso do aplicativo para melhorar seus recursos e serviços; Enviar comunicações de marketing, como e-mails promocionais; Cumprir com as leis e regulamentos aplicáveis.
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Compartilhamento de Informações</YVTitle>
        <YVText className="pb-2">
          Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias: Com nossos parceiros de negócios que nos ajudam a fornecer o aplicativo e os serviços que você solicitou; Para cumprir com a lei ou para cumprir uma ordem judicial; Para proteger os direitos, propriedade ou segurança da Yellow Visa, nossos usuários ou terceiros.
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Seus Direitos</YVTitle>
        <YVText className="pb-2">
          Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para fazer isso, entre em contato conosco pelo e-mail [email protected]
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Segurança</YVTitle>
        <YVText className="pb-2">
          A Yellow Visa usa medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, uso ou divulgação.
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Concordância</YVTitle>
        <YVText className="pb-2">
          Ao usar o aplicativo Yellow Visa, você concorda com esta política de privacidade.
        </YVText>

        <YVTitle variant="subtitle" className="pb-2">Atualizações</YVTitle>
        <YVText className="pb-2">
          Podemos atualizar esta política de privacidade de tempos em tempos. Se fizermos alterações significativas, notificaremos você por e-mail ou por meio de um aviso no aplicativo.
        </YVText>
      </div>
    </div>
   
  </div>
  );
}

