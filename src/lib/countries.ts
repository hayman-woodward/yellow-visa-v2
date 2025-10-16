import countriesData from './locales/countries.json';

export interface CountryOption {
  value: string;
  label: string;
}

/**
 * Converte o countries.json em opções para o YVSelect
 * @returns Array de opções de países ordenados alfabeticamente
 */
export function getCountryOptions(): CountryOption[] {
  return Object.entries(countriesData)
    .map(([key, value]) => ({
      value: key,
      label: value
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
}