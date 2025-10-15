import { YVBanner } from '@/components/YV';

export default function Banner() {
  return (
    <YVBanner
      src='/imgs/vistos/banner-vistos.jpg'
      src2x='/imgs/vistos/banner-vistos-2x.jpg'
      alt='Mulher sorrindo com jaqueta amarela'
      className='max-h-[560px] xl:max-h-[768px] pt-20'
    />
  );
}
