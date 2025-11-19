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
    <section className='py-10 md:py-20 bg-[#FFD46A]'>
      <div className='max-w-[1248px] mx-auto px-4 md:px-20 xl:px-0'>
        <div className='space-y-2'>
          {links.map((item, index) => (
            <Link
              key={`related-link-${index}`}
              href={item.link}
              className='group block relative px-4 py-5 rounded-lg bg-white hover:bg-gray-50 transition-colors'
            >
              <div className='relative z-10 flex items-center justify-between'>
                <h3 className='text-gray-900 text-[18px] font-semibold md:font-medium md:text-xl leading-[22px] md:leading-relaxed pr-4'>
                  {item.title}
                </h3>
                <ChevronRight className='w-5 h-5 text-gray-400 flex-shrink-0 transition-colors group-hover:text-gray-700' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

