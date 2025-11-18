import { YVBanner } from '@/components/YV';

interface FeaturedImgProps {
  imageUrl: string | null;
}

export default function FeaturedImg({ imageUrl }: FeaturedImgProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <YVBanner
      src={imageUrl}
      src2x={imageUrl}
      srcMobile={imageUrl}
      alt='Imagem destacada do post'
      className='h-[560px] xl:max-h-[768px] -mt-[88px]'
    />
  );
}
