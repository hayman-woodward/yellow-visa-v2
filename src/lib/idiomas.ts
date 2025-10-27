export interface IdiomaOption {
  value: string;
  label: string;
}

// Apenas os 5 idiomas que são mapeados para Salesforce
const idiomasData = {
  "Português": "Português",
  "Espanhol": "Español",
  "Inglês": "English",
  "Turco": "Türkçe",
  "Chinês (Mandarim)": "中文 (Mandarim)"
};

export function getIdiomaOptions(): IdiomaOption[] {
  return Object.entries(idiomasData)
    .map(([key, value]) => ({
      value: key,
      label: value
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
}

export function getIdiomaPorValor(valor: string): IdiomaOption | undefined {
  const options = getIdiomaOptions();
  return options.find(idioma => idioma.value === valor);
}
