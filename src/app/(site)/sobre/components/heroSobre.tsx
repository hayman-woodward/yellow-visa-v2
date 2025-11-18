import { YVBanner } from '@/components/YV';
import ScrollButton from '../../(home)/components/ScrollButton';

export default function HeroSobre() {
  return (
    <div className='relative'>
      <YVBanner
        src='/imgs/sobre/desktop/sobre-hero.png'
        srcMobile='/imgs/sobre/desktop/sobre-hero.png'
        alt='Hero Guia Do Imigrante'
        className='h-[560px] xl:max-h-[768px] -mt-[88px]'
      />
      {/* Scroll Button */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20'>
        <ScrollButton />
      </div>
    </div>
  );
}
