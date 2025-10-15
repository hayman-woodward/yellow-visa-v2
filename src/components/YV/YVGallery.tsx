import Image from 'next/image';
import Link from 'next/link';
import { YVCarousel } from './YVCarousel';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
}

interface YVGalleryProps {
  items: GalleryItem[];
  variant?: 'grid' | 'carousel' | 'masonry';
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | string;
  showTitles?: boolean;
  showDescriptions?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  darkMode?: boolean;
  isMobileCarousel?: boolean;
  enableAnimations?: boolean;
}

const YVGallery = ({
  items,
  variant = 'grid',
  columns = 3,
  gap = 'md',
  showTitles = false,
  showDescriptions = false,
  className = '',
  imageClassName = '',
  aspectRatio,
  darkMode = false,
  isMobileCarousel = false,
  enableAnimations = false
}: YVGalleryProps) => {
  const getGridClasses = () => {
    const colsMap: Record<1 | 2 | 3 | 4, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };

    const gapClass = getGapClass();

    return `grid ${colsMap[columns]} ${gapClass}`;
  };

  const getCarouselClasses = () => {
    const gapClass = getGapClass();

    return `flex overflow-x-auto scrollbar-hide ${gapClass} pb-4`;
  };

  const getMasonryClasses = () => {
    const colsMap: Record<1 | 2 | 3 | 4, string> = {
      1: 'columns-1',
      2: 'columns-1 md:columns-2',
      3: 'columns-1 md:columns-2 lg:columns-3',
      4: 'columns-1 md:columns-2 lg:columns-4'
    };

    return colsMap[columns];
  };

  const getGapClass = () => {
    const gapMap = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8'
    };

    return gapMap[gap as 'sm' | 'md' | 'lg'] || 'gap-6';
  };

  const getCustomGapStyle = () => {
    if (typeof gap === 'string' && !['sm', 'md', 'lg'].includes(gap)) {
      return { gap: `var(--default-gutter, ${gap})` };
    }
    return {};
  };

  const getMasonryGapStyle = () => {
    if (variant === 'masonry') {
      const gapMap = {
        sm: '1rem', // 16px
        md: '1.5rem', // 24px
        lg: '2rem' // 32px
      };

      const gapValue = gapMap[gap as 'sm' | 'md' | 'lg'] || '1.5rem';

      if (typeof gap === 'string' && !['sm', 'md', 'lg'].includes(gap)) {
        return {
          columnGap: gap,
          rowGap: gap
        };
      }

      return {
        columnGap: gapValue,
        rowGap: gapValue
      };
    }
    return {};
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'carousel':
        return getCarouselClasses();
      case 'masonry':
        return getMasonryClasses();
      default:
        return getGridClasses();
    }
  };

  const getItemClasses = () => {
    if (variant === 'carousel') {
      return 'flex-none w-72 sm:w-80';
    }
    if (variant === 'masonry') {
      return 'break-inside-avoid mb-6 w-full';
    }
    return '';
  };

  const getAnimationProps = (index: number) => {
    if (!enableAnimations) return {};
    
    // Todas as imagens usam fade-up, mas com delays escalonados menores
    const delay = 800 + (index * 100); // Reduzido de 200ms para 100ms
    
    return {
      'data-aos': 'fade-up',
      'data-aos-delay': delay,
      'data-aos-duration': '800' // Duração um pouco menor
    };
  };

  // Se isMobileCarousel está ativo, renderizar carousel mobile + grid desktop
  if (isMobileCarousel) {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Desktop - Grid Layout */}
        <div className='hidden md:block'>
          <div className={getContainerClasses()} style={variant === 'masonry' ? getMasonryGapStyle() : getCustomGapStyle()}>
            {items.map((item, index) => {
              const CardContent = () => (
                <div
                  className={`group relative overflow-hidden rounded-lg ${getItemClasses()}`}
                  {...getAnimationProps(index)}
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-xl ${aspectRatio === 'square'
                      ? 'aspect-square'
                      : aspectRatio === 'video'
                        ? 'aspect-video'
                        : aspectRatio === 'portrait'
                          ? 'aspect-[4/5]'
                          : aspectRatio === 'auto'
                            ? 'aspect-auto min-h-[300px]'
                            : imageClassName.includes('aspect-')
                              ? ''
                              : ''
                      }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={520}
                      className={`w-full ${imageClassName.includes('aspect-')
                        ? imageClassName
                        : 'h-auto'
                        } object-cover transition-transform duration-300 group-hover:scale-105`}
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />

                    {/* Overlay gradient */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>

                  {(showTitles || showDescriptions) &&
                    (item.title || item.description) && (
                      <div className={`space-y-2 pt-2 ${variant === 'masonry' ? 'text-center' : ''}`}>
                        {showTitles && item.title && (
                          <h3
                            className={`text-xl font-semibold font-heading ${darkMode ? 'text-white' : 'text-gray-900'
                              }`}
                          >
                            {item.title}
                          </h3>
                        )}
                        {showDescriptions && item.description && (
                          <p
                            className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    )}
                </div>
              );

              return (
                <div key={item.id}>
                  {item.href ? (
                    <Link href={item.href} className='block'>
                      <CardContent />
                    </Link>
                  ) : (
                    <CardContent />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile - Carousel Layout */}
        <div className='block md:hidden'>
          <YVCarousel
            items={items}
            showTitles={showTitles}
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  // Renderização padrão (grid/carousel/masonry)
  return (
    <div className={`relative w-full ${className}`}>
      <div className={getContainerClasses()} style={variant === 'masonry' ? getMasonryGapStyle() : getCustomGapStyle()}>
        {items.map((item, index) => {
          const CardContent = () => (
            <div
              className={`group relative overflow-hidden rounded-lg ${getItemClasses()}`}
              {...getAnimationProps(index)}
            >
              <div
                className={`relative w-full overflow-hidden rounded-xl ${aspectRatio === 'square'
                  ? 'aspect-square'
                  : aspectRatio === 'video'
                    ? 'aspect-video'
                    : aspectRatio === 'portrait'
                      ? 'aspect-[4/5]'
                      : aspectRatio === 'auto'
                        ? variant === 'masonry'
                          ? 'h-auto'
                          : 'aspect-auto min-h-[300px]'
                        : imageClassName.includes('aspect-')
                          ? ''
                          : ''
                  }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={520}
                  className={`w-full ${imageClassName.includes('aspect-')
                    ? imageClassName
                    : 'h-auto'
                    } object-cover transition-transform duration-300 group-hover:scale-105`}
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />

                {/* Overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>

              {(showTitles || showDescriptions) &&
                (item.title || item.description) && (
                  <div className='space-y-1 md:space-y-2 pt-1 md:pt-2'>
                    {showTitles && item.title && (
                      <h3
                        className={`text-lg md:text-xl mb-1 font-semibold font-heading ${darkMode ? 'text-white' : 'text-gray-900'
                          }`}
                      >
                        {item.title}
                      </h3>
                    )}
                    {showDescriptions && item.description && (
                      <p
                        className={`text-[15px] leading-[20px] md:text-sm md:leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
            </div>
          );

          return (
            <div key={item.id}>
              {item.href ? (
                <Link href={item.href} className='block'>
                  <CardContent />
                </Link>
              ) : (
                <CardContent />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { YVGallery };
