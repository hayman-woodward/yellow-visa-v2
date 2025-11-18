'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';

interface CarouselItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
}

interface YVCarouselProps {
  items: CarouselItem[];
  showTitles?: boolean;
  showDescriptions?: boolean;
  imageClassName?: string;
  className?: string;
  darkMode?: boolean;
  overflowVisible?: boolean; // Permite vazar o canvas
  // Optional custom renderer to replace the default image card
  renderItem?: (item: Partial<CarouselItem>) => React.ReactNode;
}

const YVCarousel = ({
  items,
  showTitles = false,
  showDescriptions = false,
  imageClassName = 'aspect-[400/520]',
  className = '',
  darkMode = false,
  overflowVisible = false,
  renderItem
}: YVCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // Sempre mostrar 3 bullets, mas limitar navegação ao número real de itens
  const count = 3;
  const maxItems = Math.min(items.length, 3);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={`w-full ${className} ${overflowVisible ? 'overflow-visible' : ''}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
          dragFree: true
        }}
        className={`w-full ${overflowVisible ? '[&>div]:overflow-visible' : ''}`}
      >
        <CarouselContent className={`-ml-2 ${overflowVisible ? '!overflow-visible' : ''}`}>
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className='pl-2 basis-[80%] sm:basis-[60%] md:basis-[50%] lg:basis-[50%] xl:basis-[33%]'
            >
              {renderItem ? (
                renderItem(item)
              ) : (
                <div className='group relative overflow-hidden rounded-lg'>
                  <div
                    className={`relative w-full overflow-hidden rounded-xl ${imageClassName}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={520}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>
                  {(showTitles || showDescriptions) &&
                    (item.title || item.description) && (
                      <div className='space-y-2 pt-2'>
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
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Navigation with Arrows */}
      <div className='flex justify-center items-center gap-2 mt-4'>
        {/* Left Arrow */}
        <button
          onClick={() => api?.scrollPrev()}
          className='w-6 h-6 flex items-center justify-center text-[#CC0044] hover:text-[#CC0044]/80 transition-colors'
          aria-label='Previous slide'
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
            <path
              d='M7.5 9L4.5 6L7.5 3'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* Dots - sempre mostrar 3 bullets */}
        {Array.from({ length: count }).map((_, index) => {
          const isActive = index === current - 1;
          const isDisabled = index >= maxItems;
          
          return (
            <button
              key={index}
              onClick={() => {
                if (!isDisabled && api) {
                  api.scrollTo(index);
                }
              }}
              disabled={isDisabled}
              className={`w-3 h-3 rounded-full transition-colors ${
                isActive
                  ? 'bg-[#CC0044] border-0'
                  : isDisabled
                    ? 'border-2 border-[#CC0044]/10 bg-transparent opacity-30 cursor-not-allowed'
                    : 'border-2 border-[#CC0044]/30 bg-transparent'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}

        {/* Right Arrow */}
        <button
          onClick={() => api?.scrollNext()}
          className='w-6 h-6 flex items-center justify-center text-[#CC0044] hover:text-[#CC0044]/80 transition-colors'
          aria-label='Next slide'
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
            <path
              d='M4.5 3L7.5 6L4.5 9'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { YVCarousel };
