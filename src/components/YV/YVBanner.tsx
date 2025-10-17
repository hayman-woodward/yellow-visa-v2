import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const yvBannerVariants = cva('relative w-full', {
  variants: {
    height: {
      sm: 'h-[300px] md:h-[400px]',
      md: 'h-[400px] md:h-[560px] xl:h-[768px]',
      lg: 'h-[500px] md:h-[700px] xl:h-[900px]',
      xl: 'h-[600px] md:h-[800px] xl:h-[1000px]'
    }
  },
  defaultVariants: {
    height: 'md'
  }
});

interface YVBannerProps {
  src: string;
  src2x?: string; // Imagem 2x opcional
  srcMobile?: string; // Imagem mobile opcional
  alt: string;
  className?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
  lazy?: boolean; // Nova prop para lazy loading
  quality?: number;
  // Nova prop para múltiplas imagens
  images?: {
    desktop: string;
    desktop2x?: string;
    mobile?: string;
  };
}

const YVBanner = ({
  src,
  src2x,
  srcMobile,
  alt,
  className = '',
  height = 'md',
  priority = false,
  lazy = false,
  quality = 85,
  images
}: YVBannerProps) => {
  // Se images for fornecido, usar ele; senão usar as props individuais
  const desktopImg = images?.desktop || src;
  const desktop2xImg = images?.desktop2x || src2x;
  const mobileImg = images?.mobile || srcMobile;
  
  // Determinar loading strategy
  const loadingStrategy = lazy ? 'lazy' : (priority ? 'eager' : 'lazy');

  return (
    <div 
      className={cn(yvBannerVariants({ height }), className)}
      data-aos="fade-in"
      data-aos-delay="200"
      data-aos-duration="1000"
    >
      {/* Imagem Desktop */}
      {desktop2xImg ? (
        <picture>
          <source media="(min-width: 768px)" srcSet={`${desktop2xImg} 2x`} />
          <Image
            src={desktopImg}
            alt={alt}
            fill
            className='object-cover hidden md:block'
            priority={priority}
            loading={loadingStrategy}
            quality={quality}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
          />
        </picture>
      ) : (
        <Image
          src={desktopImg}
          alt={alt}
          fill
          className='object-cover hidden md:block'
          priority={priority}
          loading={loadingStrategy}
          quality={quality}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
        />
      )}

      {/* Imagem Mobile */}
      {mobileImg && (
        <Image
          src={mobileImg}
          alt={alt}
          fill
          className='object-cover block md:hidden'
          priority={priority}
          loading={loadingStrategy}
          quality={quality}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
        />
      )}
    </div>
  );
};

export { YVBanner };
