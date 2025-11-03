'use client';

import { useState } from 'react';
import { YVButton, YVText, YVTextField, YVTitle, YVModal, YVSection } from '@/components/YV';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Por favor, digite seu email');
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsSuccess(true);
        setEmail('');
        setShowSuccessModal(true);
      } else {
        setMessage(data.message || data.error || 'Erro ao cadastrar email');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Erro ao cadastrar email. Tente novamente.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YVSection className='bg-[#0F0005] flex items-center justify-center px-6 md:px-23 xl:px-0 md:pb-20'>
      <div 
        className='grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch rounded-[40px] overflow-hidden min-h-[320px] lg:max-h-[320px] w-full max-w-[1248px] bg-[#FFBD1A]'
        data-aos="fade-in"
        data-aos-delay="100"
        data-aos-duration="700"
      >
        {/* Lado esquerdo - Conteúdo */}
        <div 
          className='text-black mx-auto bg-[#FFBD1A] px-8 pb-5 pt-9 md:px-12 md:py-16 flex flex-col justify-center space-y-6 order-2 md:order-1'
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="600"
        >
          <div>
            <div data-aos="fade-right" data-aos-delay="300" data-aos-duration="500">
              <YVTitle noPadding>Fique por dentro</YVTitle>
            </div>
            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="500">
              <YVText variant='small' className='!pb-0 !text-[15px]'>
                Insights, dicas e notícias selecionadas especialmente para você.
              </YVText>
            </div>
          </div>

          {/* Formulário - Mobile empilhado, Desktop inline */}
          <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-2' data-aos="fade-up" data-aos-delay="500" data-aos-duration="500">
            <div className='flex-1' data-aos="fade-up" data-aos-delay="600" data-aos-duration="400">
              <YVTextField
                label='E-mail'
                type='email'
                id='email'
                placeholder='Escreva seu e-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='flex items-end' data-aos="fade-up" data-aos-delay="700" data-aos-duration="400">
              <button
                type='submit'
                disabled={loading}
                className='w-full md:w-[104px] h-[50px] px-6 bg-[#C04] text-[#F7F5F6] hover:bg-[#C04]/90 rounded-[999px] font-bold transition-all duration-200 focus:outline-none active:scale-95 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse'
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>

          {/* Mensagem de feedback */}
          {message && (
            <div className={`text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Lado direito - Imagem */}
        <div 
          className='h-40 md:h-full max-h-[320px] order-1 md:order-2'
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="800"
        >
          <Image
            src='/imgs/newsletter-img.jpg'
            alt='Newsletter'
            width={612}
            height={320}
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Modal de Sucesso (alinhada ao Figma) */}
      <YVModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        size="md"
        className="text-center"
      >
        <div className="relative w-full mx-auto px-1 pt-8 pb-4  md:px-[80px] md:pt-12 md:pb-10 max-w-[600px] text-left break-words">
     
   

          {/* Título e texto */}
          <h3 className=" text-[20px] max-w-[260px] lg:max-w-[240px] leading-[24px] md:text-[22px] md:leading-[28px] lg:text-[32px] lg:leading-[40px] font-semibold text-[#0F0005] tracking-[-0.5px] mb-3 md:mb-6">
            Email cadastrado
            <br />
            com sucesso
          </h3>
          <p className="text-[14px] md:text-[18px] leading-[18px] md:leading-[24px] lg:leading-[26px] text-[#0F0005] mb-3 md:mb-6">
            Você foi cadastrado com sucesso na nossa newsletter!
          </p>

          {/* Botão */}
          <YVButton
            onClick={() => setShowSuccessModal(false)}
            variant="secondary"
            className="w-full md:w-fit h-[46px]"
          >
            Fechar
          </YVButton>
        </div>
      </YVModal>
    </YVSection>
  );
}
