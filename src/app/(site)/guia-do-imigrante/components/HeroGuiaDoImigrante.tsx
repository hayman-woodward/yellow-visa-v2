import { YVBanner } from '@/components/YV';

export default function HeroGuiaDoImigrante() {
  return (
    <YVBanner
      src='/imgs/guia-do-imigrante/guia-imigrante-hero.jpg'
      srcMobile='/imgs/guia-do-imigrante/guia-do-migrante-hero-mobile.jpg'
      src2x='/imgs/guia-do-imigrante/guia-imigrante-hero-2x.jpg'
      alt='Hero Guia Do Imigrante'
      className='h-[560px] xl:max-h-[768px] -mt-[88px]'
    />
  );
}
