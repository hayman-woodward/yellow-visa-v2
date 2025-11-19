export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

// Normaliza categoria para URL (mesma lógica do slug)
export function normalizeCategoryForUrl(category: string | null | undefined): string {
  if (!category) return 'blog';
  return generateSlug(category);
}