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

      {/* Modal de Sucesso */}
      <YVModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        size="md"
        className="text-center"
      >
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Ícone de sucesso animado */}
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
            {/* Confetes animados */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-ping delay-100"></div>
            <div className="absolute top-1 -left-3 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-200"></div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#0F0005]">
              🎉 Parabéns!
            </h3>
            <p className="text-lg text-gray-600">
              Você foi cadastrado com sucesso na nossa newsletter!
            </p>
          </div>

          {/* Descrição */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 w-full max-w-sm">
            <p className="text-sm text-gray-700">
              <strong>O que vem por aí:</strong><br />
              • Insights exclusivos sobre imigração<br />
              • Dicas práticas para seu processo<br />
              • Notícias atualizadas do mercado<br />
              • Conteúdos selecionados especialmente para você
            </p>
          </div>

          {/* Botão de fechar */}
          <YVButton
            onClick={() => setShowSuccessModal(false)}
            className="w-full max-w-xs"
          >
            Fechar
          </YVButton>
        </div>
      </YVModal>
    </YVSection>
  );
}
