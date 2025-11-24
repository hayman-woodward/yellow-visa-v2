import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface RelatedLinksProps {
  links: Array<{ title: string; link: string }>;
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section className='py-10 md:py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto bg-[#FFBD1A] rounded-2xl p-10 flex flex-col gap-2'>
          {links.map((item, index) => (
            <Link
              key={`related-link-${index}`}
              href={item.link}
              className='group block relative px-4 py-[22px] rounded-lg overflow-hidden'
            >
              <div className='absolute inset-0 bg-[#FFD46A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg' />
              <div className='relative z-10 flex items-center justify-between'>
                <h3 className='font-heading text-[22px] font-semibold leading-[28px] tracking-[-0.5px] text-[#0f0005] pr-4'>
                  {item.title}
                </h3>
                <ChevronRight className='w-5 h-5 text-[#0f0005] flex-shrink-0' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

