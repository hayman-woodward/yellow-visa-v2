import { YVBreadcrumbs, YVIcon, YVSection, YVText, YVTitle } from '@/components/YV';
import Link from 'next/link';

interface GuiaHeaderProps {
  title: string;
  subtitle: string;

  slug: string;
  backHref?: string;
}

export default function GuiaHeader({
  title,
  subtitle,
  slug,
  backHref = '/guia-do-imigrante'
}: GuiaHeaderProps) {
  return (
    <YVSection className="bg-white !pb-5">
      <div className='max-w-[1248px] mx-auto'>
        <Link
          href={backHref}
          className="text-sm inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-extrabold group py-[14px]"
        >
          <YVIcon
            name="arrow-left"
            width={16}
            height={16}
            className="group-hover:opacity-80 transition-opacity duration-200"
          />
          Voltar
        </Link>

        <div className='lg:max-w-[600px] pt-10'>
          <YVBreadcrumbs
            disabled
            className='pb-4 md:pb-5 '
            items={[
              { label: slug, href: slug }
            ]}
          />
          <YVTitle
            tag="h1"
            title={title}
          />
          <YVText
            className='pb-2'
          >
            {subtitle}
          </YVText>
        </div>
      </div>
    </YVSection>
  );
}
