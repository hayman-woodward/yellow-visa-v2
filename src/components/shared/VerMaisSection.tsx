import {
  YVButton,
  YVGallery,
  YVSection,
  YVText,
  YVTitle
} from '@/components/YV';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  href?: string;
}

interface VerMaisSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'outline-secondary';
  galleryItems: GalleryItem[];
  showDescriptions?: boolean;

  className?: string;
}

export default function VerMaisSection({
  title,
  description,
  buttonText,
  buttonHref,
  buttonVariant = 'outline-secondary',
  galleryItems,
  showDescriptions = false
}: VerMaisSectionProps) {
  return (
    <YVSection className='bg-white px-4 lg:px-0'>
      <div className='max-w-[1248px] md:px-8 xl:px-0 mx-auto'>
        <div className='flex flex-col lg:flex-row gap-5 md:gap-6 items-start  justify-between'>
          <div className='space-y-8 w-full lg:w-[294px] lg:flex-shrink-0'>
            <div className='md:pr-20'>
              <YVTitle
                variant='heading'
                title={title}
                className='mb-4 md:mb-6'
              />
              <YVText className='pb-1 md:pb-2 md:mb-4 text-[16px]'>
                {description}
              </YVText>

              <YVButton
                variant={buttonVariant}
                href={buttonHref}
                className='hidden md:flex'
              >
                {buttonText}
              </YVButton>
            </div>
          </div>

          <div className='w-full lg:flex-1'>
            <div className='w-full flex justify-end '>
              <YVGallery
                items={galleryItems}
                showTitles={true}
                columns={3}
                imageClassName='aspect-[294/400] object-cover max-h-[200px] md:max-h-full'
                showDescriptions={showDescriptions}
              />
            </div>
            <YVButton
              variant={buttonVariant}
              href={buttonHref}
              className='w-full mt-4 md:hidden'
            >
              {buttonText}
            </YVButton>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
