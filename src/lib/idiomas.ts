export interface Idioma {
  value: string;
  label: string;
  code: string;
  nativos: number; // milhões de falantes nativos
}

export const idiomas: Idioma[] = [
  // Top 20 idiomas mais falados no mundo
  { value: 'mandarim', label: '中文 (Mandarim)', code: 'zh', nativos: 1100 },
  { value: 'espanhol', label: 'Español', code: 'es', nativos: 480 },
  { value: 'ingles', label: 'English', code: 'en', nativos: 380 },
  { value: 'hindi', label: 'हिन्दी (Hindi)', code: 'hi', nativos: 341 },
  { value: 'arabe', label: 'العربية (Árabe)', code: 'ar', nativos: 315 },
  { value: 'bengali', label: 'বাংলা (Bengali)', code: 'bn', nativos: 228 },
  { value: 'portugues', label: 'Português', code: 'pt', nativos: 221 },
  { value: 'russo', label: 'Русский (Russo)', code: 'ru', nativos: 154 },
  { value: 'japones', label: '日本語 (Japonês)', code: 'ja', nativos: 128 },
  { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', code: 'pa', nativos: 100 },
  { value: 'alemao', label: 'Deutsch (Alemão)', code: 'de', nativos: 95 },
  { value: 'frances', label: 'Français (Francês)', code: 'fr', nativos: 80 },
  { value: 'italiano', label: 'Italiano', code: 'it', nativos: 65 },
  { value: 'coreano', label: '한국어 (Coreano)', code: 'ko', nativos: 77 },
  { value: 'tailandes', label: 'ไทย (Tailandês)', code: 'th', nativos: 61 },
  { value: 'vietnamita', label: 'Tiếng Việt (Vietnamita)', code: 'vi', nativos: 75 },
  { value: 'turco', label: 'Türkçe (Turco)', code: 'tr', nativos: 80 },
  { value: 'polones', label: 'Polski (Polonês)', code: 'pl', nativos: 40 },
  { value: 'ucraniano', label: 'Українська (Ucraniano)', code: 'uk', nativos: 40 },
  { value: 'romeno', label: 'Română (Romeno)', code: 'ro', nativos: 24 },
  { value: 'holandes', label: 'Nederlands (Holandês)', code: 'nl', nativos: 24 },
  { value: 'sueco', label: 'Svenska (Sueco)', code: 'sv', nativos: 10 },
  { value: 'noruegues', label: 'Norsk (Norueguês)', code: 'no', nativos: 5 },
  { value: 'dinamarques', label: 'Dansk (Dinamarquês)', code: 'da', nativos: 6 },
  { value: 'finlandes', label: 'Suomi (Finlandês)', code: 'fi', nativos: 5 },
  { value: 'grego', label: 'Ελληνικά (Grego)', code: 'el', nativos: 13 },
  { value: 'hebraico', label: 'עברית (Hebraico)', code: 'he', nativos: 9 },
  { value: 'checo', label: 'Čeština (Tcheco)', code: 'cs', nativos: 10 },
  { value: 'hungaro', label: 'Magyar (Húngaro)', code: 'hu', nativos: 13 },
  { value: 'bulgaro', label: 'Български (Búlgaro)', code: 'bg', nativos: 7 },
  { value: 'croata', label: 'Hrvatski (Croata)', code: 'hr', nativos: 5 },
  { value: 'servio', label: 'Српски (Sérvio)', code: 'sr', nativos: 9 },
  { value: 'eslovaco', label: 'Slovenčina (Eslovaco)', code: 'sk', nativos: 5 },
  { value: 'esloveno', label: 'Slovenščina (Esloveno)', code: 'sl', nativos: 2 },
  { value: 'lituano', label: 'Lietuvių (Lituano)', code: 'lt', nativos: 3 },
  { value: 'letao', label: 'Latviešu (Letão)', code: 'lv', nativos: 2 },
  { value: 'estoniano', label: 'Eesti (Estoniano)', code: 'et', nativos: 1 },
  { value: 'catalao', label: 'Català (Catalão)', code: 'ca', nativos: 4 },
  { value: 'basco', label: 'Euskera (Basco)', code: 'eu', nativos: 1 },
  { value: 'galego', label: 'Galego', code: 'gl', nativos: 2 },
  { value: 'irlandes', label: 'Gaeilge (Irlandês)', code: 'ga', nativos: 1 },
  { value: 'gales', label: 'Cymraeg (Galês)', code: 'cy', nativos: 1 },
  { value: 'escoces', label: 'Gàidhlig (Escocês)', code: 'gd', nativos: 1 },
  { value: 'maltes', label: 'Malti (Maltês)', code: 'mt', nativos: 1 },
  { value: 'islandes', label: 'Íslenska (Islandês)', code: 'is', nativos: 1 },
  { value: 'faroes', label: 'Føroyskt (Feroês)', code: 'fo', nativos: 0.5 },
  { value: 'luxemburgues', label: 'Lëtzebuergesch (Luxemburguês)', code: 'lb', nativos: 0.5 },
  { value: 'afrikaans', label: 'Afrikaans', code: 'af', nativos: 7 },
  { value: 'swahili', label: 'Kiswahili (Suaíli)', code: 'sw', nativos: 16 },
  { value: 'amharico', label: 'አማርኛ (Amárico)', code: 'am', nativos: 22 },
  { value: 'hausa', label: 'Hausa', code: 'ha', nativos: 40 },
  { value: 'ioruba', label: 'Yorùbá (Iorubá)', code: 'yo', nativos: 20 },
  { value: 'igbo', label: 'Igbo', code: 'ig', nativos: 20 },
  { value: 'zulu', label: 'IsiZulu (Zulu)', code: 'zu', nativos: 12 },
  { value: 'xhosa', label: 'IsiXhosa (Xhosa)', code: 'xh', nativos: 8 },
  { value: 'afrikaans', label: 'Afrikaans', code: 'af', nativos: 7 },
  { value: 'malgaxe', label: 'Malagasy (Malgaxe)', code: 'mg', nativos: 18 },
  { value: 'somali', label: 'Soomaali (Somali)', code: 'so', nativos: 15 },
  { value: 'tigrinya', label: 'ትግርኛ (Tigrínia)', code: 'ti', nativos: 7 },
  { value: 'oromo', label: 'Afaan Oromoo (Oromo)', code: 'om', nativos: 25 },
  { value: 'tigre', label: 'ትግረ (Tigre)', code: 'tig', nativos: 1 },
  { value: 'sidamo', label: 'Sidaamu Afoo (Sidamo)', code: 'sid', nativos: 3 },
  { value: 'wolaytta', label: 'Wolaytta', code: 'wal', nativos: 2 },
  { value: 'gurage', label: 'Gurage', code: 'gur', nativos: 1 },
  { value: 'afar', label: 'Afar', code: 'aa', nativos: 1 },
  { value: 'saho', label: 'Saho', code: 'ssy', nativos: 0.5 },
  { value: 'beja', label: 'Bidhaawyeet (Beja)', code: 'bej', nativos: 1 },
  { value: 'bilen', label: 'Bilen', code: 'byn', nativos: 0.5 },
  { value: 'kunama', label: 'Kunama', code: 'kun', nativos: 0.5 },
  { value: 'narra', label: 'Nara', code: 'nrr', nativos: 0.5 },
  { value: 'saho', label: 'Saho', code: 'ssy', nativos: 0.5 },
  { value: 'tigre', label: 'Tigre', code: 'tig', nativos: 1 },
  { value: 'wolaytta', label: 'Wolaytta', code: 'wal', nativos: 2 },
  { value: 'gurage', label: 'Gurage', code: 'gur', nativos: 1 },
  { value: 'afar', label: 'Afar', code: 'aa', nativos: 1 },
  { value: 'saho', label: 'Saho', code: 'ssy', nativos: 0.5 },
  { value: 'beja', label: 'Beja', code: 'bej', nativos: 1 },
  { value: 'bilen', label: 'Bilen', code: 'byn', nativos: 0.5 },
  { value: 'kunama', label: 'Kunama', code: 'kun', nativos: 0.5 },
  { value: 'narra', label: 'Nara', code: 'nrr', nativos: 0.5 }
];

// Função para obter idiomas mais populares (top 20)
export const getIdiomasPopulares = (): Idioma[] => {
  return idiomas.slice(0, 20);
};

// Função para obter todos os idiomas
export const getIdiomasCompletos = (): Idioma[] => {
  return idiomas;
};

// Função para buscar idioma por código
export const getIdiomaPorCodigo = (code: string): Idioma | undefined => {
  return idiomas.find(idioma => idioma.code === code);
};

// Função para buscar idioma por valor
export const getIdiomaPorValor = (value: string): Idioma | undefined => {
  return idiomas.find(idioma => idioma.value === value);
};
