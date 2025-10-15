import {
  YVBreadcrumbs,
  YVButton,
  YVIcon,
  YVText,
  YVTitle
} from '@/components/YV';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getFaqGroupBySlug } from '@/lib/actions/faq';

type Props = {
  slug: string;
  searchQuery?: string;
  isVisible?: boolean;
};

export default async function PerguntasFrequentes({ slug, searchQuery = '', isVisible = true }: Props) {
  const faqGroup = await getFaqGroupBySlug(slug);

  if (!faqGroup || !faqGroup.questions || faqGroup.questions.length === 0) {
    return null;
  }

  const publishedQuestions = faqGroup.questions.filter((q) => q.status === 'published');

  if (publishedQuestions.length === 0) {
    return null;
  }

  // Se não está visível (filtrado pela busca), não renderiza
  if (!isVisible) {
    return null;
  }

  // Filtrar perguntas baseado na busca
  const filteredQuestions = searchQuery
    ? publishedQuestions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : publishedQuestions;

  // Se não há perguntas após filtro, não renderiza
  if (filteredQuestions.length === 0) {
    return null;
  }
  return (
    <section className='py-10 md:py-20 bg-white'>
      <div className='max-w-[1248px] mx-auto px-4 md:px-20 xl:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 xl:gap-0 items-start'>
          {/* Lado esquerdo - Título e descrição */}
          <div className='md:max-w-[380px]'>
            <YVBreadcrumbs
              className='pb-4 md:pb-5'
              items={[
                {
                  label: faqGroup.slug.replace(/-/g, ' ').toUpperCase(),
                  href: `/faq/${faqGroup.slug}`
                }
              ]}
            />

            <YVTitle
              variant='heading'
              title={faqGroup.sectionTitle || 'Perguntas frequentes sobre o destino'}
              className='mb-4 md:mb-6 max-w-[280px] md:max-w-[350px]'
            />

            <YVText
              variant='body'
              className='pb-1 md:pb-2 mb-0 md:mb-8 text-[16px] max-w-[90%]'
            >
              {faqGroup.description || 'Descrição Phasellus netus natoque ante eget at condimentum eget.Descrição'}
            </YVText>

            <YVButton
              variant='outline'
              href={`/${faqGroup.slug}`}
              className='max-w-[200px] font-bold group text-[12px] hidden md:flex'
            >
              <YVIcon name='arrow-right' className='mr-1' />
              Ver todas as perguntas
            </YVButton>
          </div>

          {/* Lado direito - Lista de perguntas */}

          <div>
            {filteredQuestions.map((item, index) => (

              < Link
                key={`${item.link}-${index}`}
                href={item.link}
                className='group block relative px-4 -mx-4 rounded-lg'
              >
                <div className='relative z-10 flex items-center justify-between py-5'>
                  <h3 className='text-gray-900 text-[18px] font-semibold md:font-medium md:text-xl leading-[22px] md:leading-relaxed pr-4'>
                    {item.question}
                  </h3>
                  <ChevronRight className='w-5 h-5 text-gray-400 flex-shrink-0 transition-colors group-hover:text-gray-700' />
                </div>
                <div className='absolute inset-0 rounded-lg bg-[#FFD46A] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center' />
              </Link>
            ))}
          </div>
          <div>
            <YVButton
              variant='outline'
              href={`/${faqGroup.slug}`}
              className='w-full font-bold group text-[12px] flex md:hidden'
            >
              <YVIcon name='arrow-right' className='mr-1' />
              Ver todas as perguntas
            </YVButton>
          </div>
        </div>
      </div>
    </section >
  );
}
