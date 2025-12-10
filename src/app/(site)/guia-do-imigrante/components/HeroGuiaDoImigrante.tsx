import { YVBanner } from '@/components/YV';

export default function HeroGuiaDoImigrante() {
  return (
    <YVBanner
      src='/imgs/guia-do-imigrante/guia-imigrante-hero.jpg'
      srcMobile='/imgs/guia-do-imigrante/guia-do-migrante-hero-mobile.jpg'
      src2x='/imgs/guia-do-imigrante/guia-imigrante-hero-2x.jpg'
      alt='Hero Guia Do Imigrante'
      className='lg:max-h-none h-[calc(100vh+10px)] lg:h-screen max-h-[calc(100vh+10px)] hero-max-height -mt-[88px]'
      objectPosition='center top'
      priority
    />
  );
}
