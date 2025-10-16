'use client';

import { YVBanner, YVButton, YVTitle, YVIcon, YVTextField, YVSelect } from '@/components/YV';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import ProgressBar from '../ProgressBar';
import { useState, useEffect, useRef, useMemo } from 'react';
import { getIdiomaOptions, getIdiomaPorValor, type IdiomaOption } from '@/lib/idiomas';
import countriesData from '@/lib/locales/countries.json';

interface FormData {
  nomeCompleto?: string;
  email?: string;
  telefone?: string;
  pais?: string;
  idioma?: string;
}

interface ContatoForm03Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  onProximo: () => void;
  onVoltar: () => void;
  etapaAtual: number;
  totalEtapas: number;
}



export default function ContatoForm03({
  register,
  errors,
  watch,
  setValue,
  onProximo,
  onVoltar,
  etapaAtual,
  totalEtapas
}: ContatoForm03Props) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Memoizar as opções de idiomas para evitar recriação a cada render
  const idiomas = useMemo(() => getIdiomaOptions(), []);
  const idiomaSelecionado = getIdiomaPorValor(watch('idioma') || '');
  
  // Memoizar as opções de países para evitar recriação a cada render
  const countryOptions = useMemo(() => {
    return Object.entries(countriesData)
      .map(([key, value]) => ({
        value: key,
        label: value
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
  }, []);

  // Filtrar países baseado na busca
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countryOptions;
    return countryOptions.filter(country =>
      country.label.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countryOptions, countrySearch]);

  // Filtrar idiomas baseado na busca
  const filteredLanguages = useMemo(() => {
    if (!languageSearch.trim()) return idiomas;
    return idiomas.filter(idioma =>
      idioma.label.toLowerCase().includes(languageSearch.toLowerCase())
    );
  }, [idiomas, languageSearch]);

  const handleIdiomaSelect = (idioma: string) => {
    setValue('idioma', idioma);
    setIsLanguageOpen(false);
    setLanguageSearch('');
  };

  const handleCountrySelect = (country: string) => {
    setValue('pais', country);
    setIsCountryOpen(false);
    setCountrySearch('');
  };

  // Fechar dropdowns quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const paisValue = watch('pais');
  const idiomaValue = watch('idioma');
  const podeAvancar = paisValue && idiomaValue && String(paisValue).trim() && String(idiomaValue).trim();

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] lg:grid-rows-1 relative overflow-hidden min-h-screen max-h-[90vh]">
      <div className="row-start-1 px-0 md:px-0 md:relative md:overflow-hidden lg:col-start-1 lg:row-start-1 lg:order-1">
        <YVBanner
          src='/imgs/stepper-form/bg-etapa-07.jpg'
          src2x='/imgs/stepper-form/bg-etapa-07-2x.jpg'
          alt='Hero Contato'
          className='object-cover object-center h-full md:min-h-[100vh]'
          priority
          quality={85}
        />
      </div>
      <div className="row-start-2 bg-gradient-to-br bg-YV-secondary-gradient relative flex items-center lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-screen order-1 lg:order-2 px-1 md:pl-[10%] -mt-0 py-40 md:py-0">
        <div className="relative z-10 px-5 lg:px-8 md:max-w-3xl w-full -mt-7 md:mt-0">
          <ProgressBar
            etapaAtual={etapaAtual}
            totalEtapas={totalEtapas}
            titulo="Contato"
          />
          <YVTitle className="mb-8">
            Me fale onde você está e seu idioma preferencial
          </YVTitle>
          <div className="space-y-6 mb-8 max-w-[400px]">
            <div className="relative" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsCountryOpen(!isCountryOpen);
                  if (!isCountryOpen) setCountrySearch('');
                }}
                className="mb-2 w-full text-left p-0 pl-4 text-gray-900 text-base border-0 border-b border-black focus:border-black active:border-black outline-none transition-colors duration-300 rounded-none bg-transparent focus:outline-none active:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  borderColor: 'transparent !important',
                  borderBottomColor: '#000 !important',
                  backgroundColor: 'transparent !important',
                  borderTop: 'none !important',
                  borderLeft: 'none !important',
                  borderRight: 'none !important',
                  borderBottom: '1px solid #000 !important'
                }}
              >
                <span className="flex justify-between items-center w-full">
                  <span className="flex-1">{watch('pais') ? countryOptions.find(c => c.value === watch('pais'))?.label : 'Com qual país você se identifica?'}</span>
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Buscar país..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={country.value}
                          type="button"
                          onClick={() => handleCountrySelect(country.value)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 text-base"
                        >
                          {country.label}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        Nenhum país encontrado
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  if (!isLanguageOpen) setLanguageSearch('');
                }}
                className="w-full text-left p-0 pl-4 text-gray-900 text-base border-0 border-b border-black focus:border-black active:border-black outline-none transition-colors duration-300 rounded-none bg-transparent focus:outline-none active:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  borderColor: 'transparent !important',
                  borderBottomColor: '#000 !important',
                  backgroundColor: 'transparent !important',
                  borderTop: 'none !important',
                  borderLeft: 'none !important',
                  borderRight: 'none !important',
                  borderBottom: '1px solid #000 !important'
                }}
              >
                <span className="flex justify-between items-center w-full">
                  <span className="flex-1">{idiomaSelecionado ? idiomaSelecionado.label : 'Selecione o idioma'}</span>
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Buscar idioma..."
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((idioma: IdiomaOption) => (
                        <button
                          key={idioma.value}
                          type="button"
                          onClick={() => handleIdiomaSelect(idioma.value)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 text-base"
                        >
                          {idioma.label}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        Nenhum idioma encontrado
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4">
            <YVButton
              onClick={onVoltar}
              variant="outline-secondary"
              className="px-6 py-3 bg-transparent"
            >
              Voltar
            </YVButton>
            <YVButton
              onClick={onProximo}
              disabled={!podeAvancar}
              variant="secondary"
              className="px-6 py-3"
            >
              Próximo →
            </YVButton>
          </div>
        </div>
      </div>
    </div>
  );
}
