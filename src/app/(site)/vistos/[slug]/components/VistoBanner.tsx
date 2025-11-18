import { YVBanner, YVBreadcrumbs, YVText, YVTitle, YVButton } from "@/components/YV";
import ScrollButton from "../../../(home)/components/ScrollButton";

interface VistoBannerProps {
  title: string;
  slug: string;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerButtonText?: string;
  bannerButtonUrl?: string;
  imageUrl?: string;
}

export default function VistoBanner({
  title,
  slug,
  bannerTitle,
  bannerDescription,
  bannerButtonText,
  bannerButtonUrl,
  imageUrl
}: VistoBannerProps) {
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
        className='h-[600px] md:h-[560px] xl:max-h-[768px] -mt-[88px] '
      />

      {/* Overlay no topo para dar contraste ao menu no mobile */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='h-[120px] w-full bg-gradient-to-b from-black/50 to-transparent' />
      </div>

      {/* Texto sobreposto na imagem com 2 colunas */}
      <div className='absolute inset-0 z-10'>
        <div className='max-w-[1248px] mx-auto px-4 w-full h-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
            {/* Coluna 1 - Vazia apenas no desktop para alinhar com a imagem */}
            <div className='hidden md:flex items-center justify-center' />

            {/* Coluna 2 - Conteúdo */}
            <div className='flex flex-col justify-end items-start mb-8 md:mb-20'>
              <YVBreadcrumbs items={[{ label: slug, href: slug }]} disabled className="pb-4 md:pb-5 text-[#FFBD1A]" />

              <YVTitle
                tag="h1"
                title={bannerTitle || title}
                variant="hero"
                className='text-white max-w-full md:max-w-[400px]'
              />

              {bannerDescription && (
                <YVText className='text-white/90 mt-4 max-w-full md:max-w-[400px]'>
                  {bannerDescription}
                </YVText>
              )}

              {bannerButtonText && bannerButtonUrl && (
                <div className='mt-6'>
                  <YVButton
                    variant="primary"
                    size="lg"
                    href={bannerButtonUrl}
                    className="bg-[#FFBD1A] hover:bg-[#FFBD1A]/90 text-black font-semibold"
                  >
                    {bannerButtonText}
                  </YVButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Button */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20'>
        <ScrollButton />
      </div>
    </div>
  );
}
