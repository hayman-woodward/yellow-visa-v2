import { YVBanner } from '@/components/YV';

interface FeaturedImgProps {
  imageUrl: string | null;
}

export default function FeaturedImg({ imageUrl }: FeaturedImgProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div data-aos="fade-in" data-aos-delay="400" data-aos-duration="1000">
      <YVBanner
        src={imageUrl}
        src2x={imageUrl}
        srcMobile={imageUrl}
        alt='Imagem destacada do post'
        className='h-[560px] xl:max-h-[768px] -mt-[88px]'
      />
    </div>
  );
}

