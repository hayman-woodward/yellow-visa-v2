import Image from 'next/image';
import Link from 'next/link';
import { YVText, YVIcon } from '../YV';
import { getPublishedVistos, type VistoSummary } from '@/lib/actions/vistos';

export default async function Footer({
  vistos: vistosFromProps
}: {
  vistos?: VistoSummary[];
}) {
  const firstColumn = [
    { title: 'Sobre a Yellow Visa', href: '/sobre' },
    { title: 'Guia do imigrante', href: '/guia-do-imigrante' },
    { title: 'Dicas e notícias', href: '/blog' }
  ];

  // Get all VISTOS (use passed prop if available)
  const vistos = vistosFromProps ?? (await getPublishedVistos());

  // Separar vistos por país como no header
  const vistosEUA = vistos.filter(v => v.country === 'Estados Unidos');
  const vistosPortugal = vistos.filter(v => v.country === 'Portugal');

  const destinos = ['Portugal', 'Estados Unidos'];

  // const profissoes = [
  //   'Advogados',
  //   'Área da saúde',
  //   'Dentistas',
  //   'Empreendedores',
  //   'Engenheiros',
  //   'Pilotos',
  //   'Tecnologia'
  // ];

  const redesSociais = [
    { name: 'facebook', href: 'https://www.facebook.com/yellowvisa', alt: 'Facebook' },
    { name: 'instagram', href: 'https://www.instagram.com/yellowvisa/', alt: 'Instagram' },
    { name: 'linkedin', href: 'https://www.linkedin.com/company/yellowvisa/', alt: 'LinkedIn' }
  ];

  return (
    <footer className='bg-YV min-h-[400px] '>
      <div className='w-full md:max-w-[1248px] px-6 md:px-28 xl:px-0 md:mx-auto pt-20 pb-10 md:pt-[120px] md:pb-[40px]'>
        {/* Desktop Layout */}
        <div className='grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-8'>
          {/* Coluna 1 - Informações da empresa (3 spans) */}
          <div className='col-span-2 md:col-span-3 flex flex-col mx-auto md:mx-0 md:justify-between'>
            <Image
              src='/svgs/logo-yv-black.svg'
              alt='Logo'
              width={145}
              height={132}
              className='md:w-[145px] md:h-[132px] w-[62px] h-[56px] mx-auto md:mx-0 mb-9 md:mb-0'
            />
            <div className='space-y-6'>
              <div>
                <YVText className='font-extrabold pb-2'>
                  YELLOW VISA PLLC
                </YVText>
                <YVText className='text-sm '>
                  1717 K St NW Suite 905
                  <br />
                  Washington DC - 20006
                </YVText>
                <YVText className='pb-2'>hello@yellowvisa.com</YVText>
              </div>

              {/* Redes sociais */}
              <div className='flex gap-2 pb-6 md:pb-0'>
                {redesSociais.map((rede) => (
                  <Link
                    key={rede.name}
                    href={rede.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-[46px] h-[46px] bg-[#CC0044] rounded-full flex items-center justify-center hover:bg-[#CC0044]/80 transition-colors'
                  >
                    <YVIcon name={rede.name} alt={rede.alt} />
                  </Link>
                ))}
              </div>

              {/* Política de Privacidade */}
              <Link
                href='/politica-de-privacidade'
                className='block text-base hover:text-gray-600 transition-colors font-extrabold py-[20px]'
              >
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Coluna 2 - Sobre a Yellow Visa (1 span) */}
          <div className='col-span-2 md:col-span-1 mb-4 md:mb-0'>
            {firstColumn.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='block text-base hover:text-gray-600 transition-colors font-extrabold py-[6px] '
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Coluna 3 - Vistos e Destinos (1 span) */}
          <div className='md:col-span-1 space-y-6'>
            <div>
              <Link
                href={'/vistos'}
                className='block text-base hover:text-gray-600 transition-colors font-extrabold py-0 md:py-[6px]'
              >
                Vistos
              </Link>
              <div className='space-y-2 '>
                {/* Estados Unidos */}
                {vistosEUA.length > 0 && (
                  <>
                    <div className='pt-3'>
                      <YVText
                        variant='small'
                        className='text-gray-900 !font-bold text-sm uppercase tracking-wide'
                      >
                        Estados Unidos
                      </YVText>
                    </div>
                    {vistosEUA.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/vistos/${item.slug}`}
                        className='group flex items-center justify-between text-sm hover:text-gray-600 transition-all duration-300 relative px-4 -mx-4 py-2 md:py-4 max-w-[164px] md:max-w-[188px]'
                      >
                        <span className='relative z-10'>{item.label}</span>
                        <span className='text-xs relative z-10'>›</span>
                        <div className='absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded'></div>
                      </Link>
                    ))}
                  </>
                )}

                {/* Portugal */}
                {vistosPortugal.length > 0 && (
                  <>
                    <div className='py-1 mt-4'>
                      <YVText
                        variant='small'
                        className='text-gray-900 !font-semibold text-sm uppercase tracking-wide'
                      >
                        Portugal
                      </YVText>
                    </div>
                    {vistosPortugal.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/vistos/${item.slug}`}
                        className='group flex items-center justify-between text-sm hover:text-gray-600 transition-all duration-300 relative px-4 -mx-4 py-2 md:py-4 max-w-[164px] md:max-w-[188px]'
                      >
                        <span className='relative z-10'>{item.label}</span>
                        <span className='text-xs relative z-10'>›</span>
                        <div className='absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded'></div>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Coluna 4 - Destinos e Profissões (1 span) */}
          <div className='col-span-1 space-y-6'>
            <div>
              <Link
                href={'/destinos'}
                className='block text-base hover:text-gray-600 transition-colors font-extrabold py-0 md:py-[6px]'
              >
                Destinos
              </Link>
              <div className='space-y-2'>
                {destinos.map((item, index) => (
                  <Link
                    key={index}
                    href='#'
                    className='group flex items-center justify-between text-sm hover:text-gray-600 transition-all duration-300 relative px-4 -mx-4 py-2 md:py-4 max-w-[164px] md:max-w-[188px]'
                  >
                    <span className='relative z-10'>{item}</span>
                    <span className='text-xs relative z-10'>›</span>
                    <div className='absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded'></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* <div>
              <YVText className='font-bold text-lg mb-4'>Profissões</YVText>
              <div className='space-y-2'>
                {profissoes.map((item, index) => (
                  <Link
                    key={index}
                    href='#'
                    className='group flex items-center justify-between text-sm hover:text-gray-600 transition-all duration-300 relative py-2 md:py-4 px-4 -mx-4'
                  >
                    <span className='relative z-10'>{item}</span>
                    <span className='text-xs relative z-10'>›</span>
                    <div className='absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded'></div>
                  </Link>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Credit */}
        <div className='mt-6 md:mt-12 pt-0 md:pt-4 flex gap-2 justify-end items-end'>
          <span>by</span>
          <Link href='https://hayhyve.com' target='_blank'>
            <Image
              src='/svgs/hayhyve.svg'
              alt='Hyve'
              width={84}
              height={20}
              className='mx-auto md:mx-0'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
