import { YVBreadcrumbs, YVGallery, YVTitle } from '@/components/YV';

export default function Destinos() {
  const gallery2Items = [
    {
      id: '1',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Estados Unidos',
      title: 'Estados Unidos',
      description: ''
    },
    {
      id: '2',
      src: '/imgs/home/estados-unidos.jpg',
      alt: 'Portugal',
      title: 'Portugal',
      description: ''
    }
  ];
  return (
    <div
      className='pt-[120px] pb-5'
      style={{
        background: `linear-gradient(16deg, rgba(255, 103, 0, 0.10) 6.2%, rgba(255, 103, 0, 0.00) 73.66%), var(--background-background, #0F0005)`
      }}
    >
      {/* Simplificamos seu visto */}
      <section className='pt-[180px] md:px-16 xl:px-0'>
        <div className='max-w-[1248px] px-4 mx-auto md:py-[80px] xl:px-0'>
          <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
            <YVBreadcrumbs
              className='pb-4 md:pb-5'
              items={[{ label: 'Destinos', href: '/destinos' }]}
            />
          </div>

          {/* Titulo e subtitulo */}
          <div className='flex flex-col gap-5 md:gap-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-15 items-start'>
              <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                <YVTitle
                  className='text-white'
                  title='Um mundo inteiro pra ser visto por você'
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                <p className='text-white text-base leading-relaxed max-w-[80%]'>
                  Nosso papel é simplificar esse caminho com processos 100% personalizados e do seu jeito.
                </p>
              </div>
            </div>
            {/* Second Gallery with overlap effect */}

            <div className='z-10' data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
              <YVGallery
                items={gallery2Items}
                columns={2}
                showTitles={true}
                darkMode
                isMobileCarousel
                enableAnimations={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
