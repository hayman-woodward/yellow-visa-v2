'use client';

import { useState } from 'react';
import { YVButton, YVSection, YVIcon } from '@/components/YV';

export default function ObtenhaAjudaSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // TODO: Integrar com backend
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <YVSection className='bg-[#0F0005] py-20'>
      <div className='max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0'>
        <div className='text-center'>
          <h2 className='text-white text-2xl lg:text-3xl font-semibold mb-8'>
            Obtenha ajuda sobre imigração.
          </h2>

          <div className='flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto'>
            <div className='relative flex-1'>
              <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                <YVIcon name='search' className='text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Buscar informação sobre imigração'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className='w-full h-12 pl-12 pr-4 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#FFBD1A] text-gray-700'
              />
            </div>
            <YVButton
              variant='secondary'
              onClick={handleSearch}
              className='rounded-full h-12 px-8 sm:ml-2 mt-4 sm:mt-0'
            >
              Buscar
            </YVButton>
          </div>
        </div>
      </div>
    </YVSection>
  );
}
