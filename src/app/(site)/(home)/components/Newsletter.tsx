import { YVText, YVTitle } from '@/components/YV';
import Image from 'next/image';

export default function Newsletter() {
  return (
    <section className='bg-[#0F0005] flex items-center justify-center px-10 pb-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch rounded-[40px] overflow-hidden min-h-[320px] lg:max-h-[320px] w-full max-w-[1248px] bg-[#FFBD1A]'>
        {/* Lado esquerdo - Conteúdo */}
        <div className='text-black mx-auto bg-[#FFBD1A]  px-12 py-16 flex flex-col justify-center space-y-6'>
          <div className=''>
            <YVTitle noPadding className='text-[#0F0005]'>
              Fique por dentro
            </YVTitle>
            <YVText variant='small' className='!pb-0'>
              Insights, dicas e notícias selecionadas especialmente para você.
            </YVText>
          </div>

          {/* Formulário inline */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label htmlFor='email' className='block text-sm font-medium mb-3'>
                E-mail
              </label>
              <input
                type='email'
                id='email'
                placeholder='Escreva seu e-mail'
                className='w-full px-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base'
              />
            </div>
            <div className='flex items-end'>
              <button
                type='submit'
                className='bg-[#E91E63] hover:bg-[#C2185B] text-white font-semibold py-4 px-8 rounded-xl transition-colors text-base'
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>

        {/* Lado direito - Imagem */}
        <div className='h-full max-h-[320px]'>
          <Image
            src='/imgs/newsletter-img.jpg'
            alt='Newsletter'
            width={612}
            height={320}
            className='w-full h-64 lg:h-full object-cover'
          />
        </div>
      </div>
    </section>
  );
}
