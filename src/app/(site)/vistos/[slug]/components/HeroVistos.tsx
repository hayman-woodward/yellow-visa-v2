import { YVBanner, YVBreadcrumbs, YVText, YVTitle } from "@/components/YV";

interface HeroVistosProps {
  title: string;
  slug: string;
  bannerTitle?: string;
  imageUrl?: string;
}

export default function HeroVistos({
  title,
  slug,
  bannerTitle,
  imageUrl
}: HeroVistosProps) {
  // Fallback para imagem padrão se não houver imageUrl
  const heroImage = imageUrl || '/imgs/vistos/visto/vistos-slug.jpg';
  const heroImage2x = imageUrl || '/imgs/vistos/hero-vistos-2x.jpg';
  const heroImageMobile = imageUrl || '/imgs/vistos/hero-vistos-mobile.jpg';

  return (
    <div className='relative'>
      <YVBanner
        src={heroImage}
        src2x={heroImage2x}
        srcMobile={heroImageMobile}
        alt={`${title} - ${slug}`}
        className='h-[560px] xl:max-h-[768px] -mt-[88px]'
      />

      {/* Texto sobreposto na imagem com 2 colunas */}
      <div className='absolute inset-0 z-10'>
        <div className='max-w-[1248px] mx-auto px-4 w-full h-full'>
          <div className='grid grid-cols-2 h-full'>
            {/* Coluna 1 - Vazia (para a mulher ficar alinhada) */}
            <div className='flex items-center justify-center'>
              {/* Espaço vazio para alinhar com a mulher */}
            </div>

            {/* Coluna 2 - Conteúdo */}
            <div className='flex flex-col justify-end items-start mb-8 md:mb-20'>
              <div data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                <YVBreadcrumbs items={[{ label: slug, href: slug }]} disabled className="pb-4 md:pb-5" />
              </div>

              <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1400">
                <YVTitle
                  tag="h1"
                  title={bannerTitle || title}
                  variant="hero"
                  className='text-white max-w-[400px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}