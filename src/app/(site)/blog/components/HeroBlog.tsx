import { YVBanner } from '@/components/YV';

export default function HeroBlog() {
  return (
    <YVBanner
      src='/imgs/blog/desktop/blog-hero.jpg'
      src2x='/imgs/blog/desktop/blog-hero-2x.jpg'
      srcMobile='/imgs/blog/mobile/blog-hero.jpg'
      alt='Mulher sorrindo com jaqueta amarela'
      className='h-[560px] xl:max-h-[768px] -mt-[88px]'
    />
  );
}
