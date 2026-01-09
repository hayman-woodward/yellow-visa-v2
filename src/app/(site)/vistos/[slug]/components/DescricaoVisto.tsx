import { YVSection } from '@/components/YV';

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
              <div 
                className="
                  text-foreground
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:leading-tight
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:leading-tight
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-5
                  [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-3 [&_h4]:mt-4
                  [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-foreground/90
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                  [&_li]:mb-2 [&_li]:leading-relaxed
                  [&_a]:text-blue-800 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-900
                  [&_blockquote]:border-l-4 [&_blockquote]:border-gray-800/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-lg [&_blockquote]:text-foreground/80
                  [&_img]:rounded-xl [&_img]:max-w-full [&_img]:h-auto [&_img]:my-6 [&_img]:shadow-md
                  [&_code]:bg-gray-900/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
                  [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6
                  [&_strong]:font-bold [&_strong]:text-foreground
                  [&_em]:italic
                  [&_hr]:my-8 [&_hr]:border-gray-800/20
                "
                data-aos="fade-up" 
                data-aos-delay="400" 
                data-aos-duration="1000"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </div>
      </YVSection>
    </div>
  );
}

