import { YVSection } from '@/components/YV';

interface DescricaoVistoProps {
  excerpt?: string;
  content?: string;
}

export default function DescricaoVisto({ excerpt, content }: DescricaoVistoProps) {
  return (
    <div className='bg-[#FFBD1A]'>
      {/* About 02 Section */}
      <YVSection className='px-6 md:px-4'>
        <div className='max-w-[1248px] mx-auto md:px-8 xl:px-0 '>
          <div className='grid max-w-[823px] mx-auto'>
            {excerpt && (
              <div className='mb-4 md:mb-6' data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <h2 className='text-[24px] leading-[28px] md:text-[32px] font-[600] md:font-bold md:leading-[40px] tracking-[-0.5px] pb-1 md:pb-0'>
                  {excerpt}
                </h2>
              </div>
            )}
            {content && (
              <div 
                className="
                  text-foreground
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:leading-tight md:[&_h1]:text-3xl md:[&_h1]:mb-8 md:[&_h1]:mt-12
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:leading-tight md:[&_h2]:text-2xl md:[&_h2]:mb-6 md:[&_h2]:mt-10
                  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 md:[&_h3]:text-xl md:[&_h3]:mb-4 md:[&_h3]:mt-8
                  [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-3 md:[&_h4]:text-lg md:[&_h4]:mb-3 md:[&_h4]:mt-6
                  [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:text-foreground/90 md:[&_p]:text-base md:[&_p]:mb-5
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:mt-2 md:[&_ul]:pl-6 md:[&_ul]:mb-6 md:[&_ul]:mt-4
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:mt-2 md:[&_ol]:pl-6 md:[&_ol]:mb-6 md:[&_ol]:mt-4
                  [&_li]:mb-2 [&_li]:leading-relaxed md:[&_li]:mb-3
                  [&_a]:text-blue-800 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-900
                  [&_blockquote]:border-l-4 [&_blockquote]:border-gray-800/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-base [&_blockquote]:text-foreground/80 md:[&_blockquote]:pl-6 md:[&_blockquote]:my-8 md:[&_blockquote]:text-lg
                  [&_img]:rounded-xl [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:shadow-md md:[&_img]:my-8
                  [&_code]:bg-gray-900/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
                  [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4 md:[&_pre]:p-4 md:[&_pre]:my-8
                  [&_strong]:font-bold [&_strong]:text-foreground
                  [&_em]:italic
                  [&_hr]:my-6 [&_hr]:border-gray-800/20 md:[&_hr]:my-10
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
