export interface IdiomaOption {
  value: string;
  label: string;
}

const idiomasData = {
  "Alemão": "Deutsch (Alemão)",
  "Árabe": "العربية (Árabe)",
  "Bengali": "বাংলা (Bengali)",
  "Chinês (Mandarim)": "中文 (Mandarim)",
  "Coreano": "한국어 (Coreano)",
  "Dinamarquês": "Dansk (Dinamarquês)",
  "Espanhol": "Español",
  "Finlandês": "Suomi (Finlandês)",
  "Francês": "Français (Francês)",
  "Grego": "Ελληνικά (Grego)",
  "Hebraico": "עברית (Hebraico)",
  "Hindi": "हिन्दी (Hindi)",
  "Holandês": "Nederlands (Holandês)",
  "Húngaro": "Magyar (Húngaro)",
  "Inglês": "English",
  "Italiano": "Italiano",
  "Japonês": "日本語 (Japonês)",
  "Norueguês": "Norsk (Norueguês)",
  "Polonês": "Polski (Polonês)",
  "Português": "Português",
  "Punjabi": "ਪੰਜਾਬੀ (Punjabi)",
  "Romeno": "Română (Romeno)",
  "Russo": "Русский (Russo)",
  "Sueco": "Svenska (Sueco)",
  "Tailandês": "ไทย (Tailandês)",
  "Turco": "Türkçe (Turco)",
  "Ucraniano": "Українська (Ucraniano)",
  "Vietnamita": "Tiếng Việt (Vietnamita)"
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
