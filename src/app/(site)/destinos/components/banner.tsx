import { YVBanner } from '@/components/YV';

export default function Banner() {
  return (
    <YVBanner
      src='/imgs/destinos/destinos-banner.jpg'
      src2x='/imgs/destinos/destinos-banner-2x.jpg'
      alt='Mulher sorrindo com jaqueta amarela'
      className='max-h-[560px] xl:max-h-[768px] pt-20'
    />
  );
}
