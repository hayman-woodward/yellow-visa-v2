import { YVBanner } from '@/components/YV';

export default function Banner() {
  return (
    <div 
      className='relative w-full h-[400px] md:h-[600px] xl:h-[768px]'
      data-aos="fade-in"
      data-aos-delay="200"
      data-aos-duration="1000"
    >
      <YVBanner
        src='/imgs/sobre/desktop/photo-banner.jpg'
        srcMobile='/imgs/sobre/mobile/photo-banner.jpg'
        alt='Mulher sorrindo com jaqueta amarela'
        className='object-cover h-[400px] md:h-[600px] xl:h-[768px]'
        priority
      />
    </div>
  );
}
