export type MaskType = 'phone' | 'cpf' | 'cnpj' | 'cep' | 'currency';

export const formatMask = (value: string, type: MaskType): string => {
  const numbers = value.replace(/\D/g, '');
  
  switch (type) {
    case 'phone':
      if (numbers.length === 0) return '';
      if (numbers.length <= 2) return `(${numbers}`;
      if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    
    case 'cpf':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    
    case 'cnpj':
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
      if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
      if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
    
    case 'cep':
      if (numbers.length <= 5) return numbers;
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    
    case 'currency':
      const numericValue = parseFloat(numbers) / 100;
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numericValue);
    
    default:
      return value;
  }
};

export const getMaskPlaceholder = (type: MaskType): string => {
  switch (type) {
    case 'phone':
      return '(00) 99999-9999';
    case 'cpf':
      return '000.000.000-00';
    case 'cnpj':
      return '00.000.000/0000-00';
    case 'cep':
      return '00000-000';
    case 'currency':
      return 'R$ 0,00';
    default:
      return '';
  }
};
