'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { YVSection, YVTextField, YVTitle } from '@/components/YV';

interface FaqSearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function FaqSearch({ onSearch, searchQuery }: FaqSearchProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(localQuery);
    }
  };

  // Busca automática conforme digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearch(value); // Busca automática
  };

  return (
    <YVSection className="bg-black py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <YVTitle className="text-white mb-2">
          Obtenha ajuda sobre imigração.
        </YVTitle>

        <div className="max-w-[584px] mx-auto">
          <YVTextField
            type="text"
            size="xl"
            placeholder="Buscar informação sobre imigração"
            value={localQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            leftIcon={<Search className="w-5 h-5 text-gray-400" />}
            className="rounded-lg focus:ring-2 focus:ring-pink-500 rounded-xl mb-1"
          />
        </div>
      </div>
    </YVSection>
  );
}
