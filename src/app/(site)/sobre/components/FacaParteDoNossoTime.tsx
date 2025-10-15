import { YVButton } from '@/components/YV';
import Image from 'next/image';

export default function FacaParteDoNossoTime() {
  return (
    <div className='w-full max-w-[1248px] mx-auto px-4 py-16'>
      <div
        className='relative rounded-3xl max-h-[320px]  flex flex-col justify-center items-center gap-6 md:p-8'
        style={{
          borderRadius: 'var(--card-radius-corner-lg, 24px)',
          background:
            'linear-gradient(16deg, rgba(255, 103, 0, 0.40) 6.2%, rgba(255, 103, 0, 0.00) 73.66%), var(--background-background, #FFBD1A)'
        }}
      >
        {/* Laço SVG posicionado como no Figma */}
        <div className='absolute inset-0 top-0 left-0 overflow-hidden rounded-3xl pointer-events-none'>
          <Image
            src='/svgs/sobre-laco.svg'
            alt='Laço decorativo'
            width={1969}
            height={640}
            className='absolute top-0 left-0'
            priority
          />
        </div>

        {/* Conteúdo posicionado à esquerda como no Figma */}
        <div className='relative z-10 text-left self-start py-10 px-4 max-w-[90%]'>
          <h2 className='text-3xl lg:text-4xl font-bold text-black mb-4'>
            Faça parte do nosso time
          </h2>
          <p className='text-black/80 mb-8 leading-relaxed'>
            Lorem ipsum dolor sit amet consectetur. Dui amet donec suscipit sit.
            Urna vitae consequat in eget. Suspendisse viverra et quis sit
            libero.
          </p>
          <YVButton
            variant='secondary'
            href='mailto:contato@yellowvisa.com'
            size='lg'
            className='bg-[#CC0044] hover:bg-[#CC0044]/90 text-white px-8'
          >
            Conheça
          </YVButton>
        </div>
      </div>
    </div>
  );
}
