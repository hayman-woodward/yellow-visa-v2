import { YVBanner } from '@/components/YV';
import ScrollButton from '../../(home)/components/ScrollButton';

export default function HeroSobre() {
  return (
    <div className='relative'>
      <YVBanner
        src='/imgs/sobre/desktop/hero-yv-sobre.jpg'
        src2x='/imgs/sobre/desktop/hero-yv-sobre@2x.jpg'
        srcMobile='/imgs/sobre/desktop/hero-yv-sobre.jpg'
        alt='Hero Sobre'
        className='lg:max-h-none h-[calc(100vh+10px)] lg:h-screen max-h-[calc(100vh+10px)] hero-max-height -mt-[88px]'
        objectPosition='center top'
        priority
      />
      {/* Scroll Button */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20'>
        <ScrollButton />
      </div>
    </div>
  );
}
