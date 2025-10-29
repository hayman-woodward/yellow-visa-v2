/**
 * Gera URL inteligente para o botão "Começar"
 * - Se já existe UTM de campanha salvo → usa ele
 * - Se NÃO existe UTM salvo → usa o UTM manual do site
 */
export function getSmartComecarUrl(): string {
  if (typeof window === 'undefined') {
    return '/comecar';
  }

  // Verificar se já existe UTM salvo (de campanhas)
  const storedUtm = localStorage.getItem('utm_data');
  
  if (storedUtm) {
    // Se existe UTM de campanha, usar sem adicionar nada
    // Os parâmetros salvos serão usados no formulário
    return '/comecar';
  }

  // Se NÃO existe UTM, usar o UTM manual do site
  return '/comecar?utm_medium=botao-site&utm_source=site-comecar-agora&utm_campaign=botao-site-comecar-agora';
}

