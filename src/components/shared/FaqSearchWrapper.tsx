'use client';

import { useState } from 'react';
import FaqSearch from './FaqSearch';
import PerguntasFrequentesClient from './PerguntasFrequentesClient';
import { FaqGroupData } from '@/lib/actions/faq';

interface FaqSearchWrapperProps {
  faqGroups: FaqGroupData[];
}

export default function FaqSearchWrapper({ faqGroups }: FaqSearchWrapperProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar grupos baseado na busca
  const filteredGroups = faqGroups.filter(group => {
    // Se não tem nada escrito, mostra todos
    if (!searchQuery || !searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    // Verificar se o título do grupo contém a busca
    const titleMatch = group.title.toLowerCase().includes(query);

    // Verificar se alguma pergunta contém a busca
    const questionMatch = group.questions.some(q =>
      q.question.toLowerCase().includes(query)
    );

    return titleMatch || questionMatch;
  });

  return (
    <>
      {/* Busca */}
      <FaqSearch onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Grupos de FAQ */}
      {filteredGroups.map((group) => (
        <PerguntasFrequentesClient
          key={group.slug}
          faqGroup={group}
          searchQuery={searchQuery}
          isVisible={true}
        />
      ))}

    </>
  );
}
