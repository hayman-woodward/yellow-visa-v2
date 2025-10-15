import { YVSection, YVText, YVYouTubePlayer } from '@/components/YV';
import YVHtmlRender from '@/components/YV/YVHtmlRender';

interface DescricaoVistoProps {
  excerpt?: string;
  content?: string;
}

export default function DescricaoVisto({ excerpt, content }: DescricaoVistoProps) {
  return (
    <div className='bg-[#FFBD1A]'>
      {/* About 02 Section */}
      <YVSection className='px-4'>
        <div className='max-w-[1248px] mx-auto md:px-8 xl:px-0 '>
          <div className='grid max-w-[823px] mx-auto'>
            {excerpt && (
              <div className='mb-4 md:mb-6' data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <h2 className='text-[24px] leading-[28px] md:text-[32px] font-[600] md:font-bold md:leading-[40px] tracking-[-0.5px] pb-1 md:pb-2'>
                  {excerpt}
                </h2>
              </div>
            )}
            {content && (
              <div className='space-y-4 md:space-y-6' data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                <YVHtmlRender content={content} />
              </div>
            )}
          </div>
        </div>
      </YVSection>
    </div>
  );
}
