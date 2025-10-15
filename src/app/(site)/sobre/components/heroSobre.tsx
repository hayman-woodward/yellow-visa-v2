import { YVBanner } from '@/components/YV';

export default function HeroSobre() {
  return (
    <YVBanner
      src='/imgs/sobre/desktop/sobre-hero.png'
      srcMobile='/imgs/sobre/desktop/sobre-hero.png'
      alt='Hero Guia Do Imigrante'
      className='h-[560px] xl:max-h-[768px] -mt-[88px]'
    />
  );
}
