'use client';

import { useState, useEffect } from 'react';
import { VistoData } from '@/lib/actions/vistos';

interface DashboardStats {
  usersCount: number;
  vistosCount: number;
  blogPostsCount: number;
  contactsCount: number;
  leadsCount: number;
}


interface Destino {
  id: string;
  name: string;
  slug: string;
  country: string;
  continent: string;
  description?: string;
  content?: string;
  bannerTitle?: string;
  highlights?: string;
  status: string;
  imageUrl?: string;
  // Campos das principais cidades
  cityEnabled?: boolean;
  cityTitle?: string;
  cityDescription?: string;
  city1Title?: string;
  city1Description?: string;
  city1Image?: string;
  city2Title?: string;
  city2Description?: string;
  city2Image?: string;
  city3Title?: string;
  city3Description?: string;
  city3Image?: string;
  city4Title?: string;
  city4Description?: string;
  city4Image?: string;
  // Campos dos diferenciais
  diferenciaisEnabled?: boolean;
  diferenciaisTitle?: string;
  diferenciaisDescription?: string;
  diferencial1Title?: string;
  diferencial1Description?: string;
  diferencial1Image?: string;
  diferencial2Title?: string;
  diferencial2Description?: string;
  diferencial2Image?: string;
  diferencial3Title?: string;
  diferencial3Description?: string;
  diferencial3Image?: string;
  diferencial4Title?: string;
  diferencial4Description?: string;
  diferencial4Image?: string;
  // Campos dos benefícios
  beneficiosEnabled?: boolean;
  beneficio1Title?: string;
  beneficio1Description?: string;
  beneficio1Icon?: string;
  beneficio2Title?: string;
  beneficio2Description?: string;
  beneficio2Icon?: string;
  beneficio3Title?: string;
  beneficio3Description?: string;
  beneficio3Icon?: string;
  // Campos dos requisitos especiais
  requisitosEnabled?: boolean;
  requisitosTitle?: string;
  requisitosDescription?: string;
  requisitosBreadcrumb?: string;
  requisitosButtonText?: string;
  requisitosButtonUrl?: string;
  requisito1Title?: string;
  requisito1Description?: string;
  requisito1Icon?: string;
  requisito2Title?: string;
  requisito2Description?: string;
  requisito2Icon?: string;
  requisito3Title?: string;
  requisito3Description?: string;
  requisito3Icon?: string;
  requisito4Title?: string;
  requisito4Description?: string;
  requisito4Icon?: string;
  requisito5Title?: string;
  requisito5Description?: string;
  requisito5Icon?: string;
  requisito6Title?: string;
  requisito6Description?: string;
  requisito6Icon?: string;
  requisito7Title?: string;
  requisito7Description?: string;
  requisito7Icon?: string;
  requisito8Title?: string;
  requisito8Description?: string;
  requisito8Icon?: string;
  // Campos do CTA
  ctaEnabled?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
}

interface Historia {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorName: string;
  country: string;
  status: string;
  imageUrl?: string;
  createdAt: string;
}

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  position: string;
  bio: string | null;
  imageUrl: string | null;
  email: string | null;
  linkedin: string | null;
  order: number;
  status: string;
  createdAt: string;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Adicionar cache busting para evitar dados stale
        const response = await fetch('/api/dashboard/stats', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useVistos() {
  const [vistos, setVistos] = useState<VistoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVistos = async () => {
    try {
      const response = await fetch('/api/dashboard/vistos');
      if (!response.ok) throw new Error('Failed to fetch vistos');
      const data = await response.json();
      setVistos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVistos();
  }, []);

  return { vistos, loading, error, refetch: fetchVistos };
}

export function useDestinos() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await fetch('/api/dashboard/destinos');
        if (!response.ok) throw new Error('Failed to fetch destinos');
        const data = await response.json();
        setDestinos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  return { destinos, loading, error };
}

export function useHistorias() {
  const [historias, setHistorias] = useState<Historia[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response = await fetch('/api/dashboard/historias');
        if (!response.ok) throw new Error('Failed to fetch historias');
        const data = await response.json();
        setHistorias(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchHistorias();
  }, []);

  return { historias, loading, error };
}

export function useHistoria(slug: string) {
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchHistoria = async () => {
      try {
        const response = await fetch(`/api/dashboard/historias/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('História não encontrada');
          }
          throw new Error('Failed to fetch historia');
        }
        const data = await response.json();
        setHistoria(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoria();
  }, [slug]);

  return { historia, loading, error };
}

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('/api/dashboard/usuarios');
        if (!response.ok) throw new Error('Failed to fetch usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return { usuarios, loading, error };
}

export function useDestino(slug: string) {
  const [destino, setDestino] = useState<Destino | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchDestino = async () => {
      try {
        const response = await fetch(`/api/dashboard/destinos/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Destino não encontrado');
          }
          throw new Error('Failed to fetch destino');
        }
        const data = await response.json();
        setDestino(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDestino();
  }, [slug]);

  return { destino, loading, error };
}

export function useVisto(slug: string) {
  const [visto, setVisto] = useState<VistoData | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchVisto = async () => {
      try {
        const response = await fetch(`/api/dashboard/vistos/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Visto não encontrado');
          }
          throw new Error('Failed to fetch visto');
        }
        const data = await response.json();
        setVisto(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchVisto();
  }, [slug]);

  return { visto, loading, error };
}

export const useUser = (id: string) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/dashboard/usuarios/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};

// Hook para membros da equipe
export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/dashboard/team');
        
        if (!response.ok) {
          // Se a API falhar, retorna array vazio para mostrar a interface
          console.warn('API not available, showing empty state');
          setTeamMembers([]);
          return;
        }
        
        const data = await response.json();
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        // Em caso de erro, mostra array vazio em vez de erro
        console.warn('Error fetching team members, showing empty state:', err);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return { teamMembers, loading };
}

export function useTeamMember(slug: string) {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchTeamMember = async () => {
      try {
        const response = await fetch(`/api/dashboard/team/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Membro da equipe não encontrado');
          } else {
            setError('Erro ao carregar membro da equipe');
          }
          return;
        }
        
        const data = await response.json();
        setMember(data);
      } catch (err) {
        console.error('Error fetching team member:', err);
        setError('Erro interno do servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [slug]);

  return { member, loading, error };
}

// ===========================================
// FAQ HOOKS
// ===========================================

export interface FaqQuestion {
  id: string;
  question: string;
  content?: string;
  link: string;
  order: number;
  status: string;
  authorId?: string;
  videoUrl?: string;
  imageurl?: string;
  metadescription?: string;
  ogdescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  status: string;
  sectionTitle: string | null;
  questions: FaqQuestion[];
  createdAt: string;
  updatedAt: string;
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/dashboard/faqs');
        
        if (!response.ok) {
          console.warn('API not available, showing empty state');
          setFaqs([]);
          return;
        }
        
        const data = await response.json();
        setFaqs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.warn('Error fetching FAQs, showing empty state:', err);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return { faqs, loading };
}

export function useFaq(slug: string) {
  const [faq, setFaq] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchFaq = async () => {
      try {
        const response = await fetch(`/api/dashboard/faqs/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('FAQ não encontrado');
          } else {
            setError('Erro ao carregar FAQ');
          }
          return;
        }
        
        const data = await response.json();
        setFaq(data);
      } catch (err) {
        console.error('Error fetching FAQ:', err);
        setError('Erro interno do servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, [slug]);

  return { faq, loading, error };
}

// Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  featuredImage: string | null;
  category: string | null;
  tags: string | null;
  order: number;
  status: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  authorId: string | null;
  relatedLinksEnabled: boolean;
  relatedLinks: string | null;
}

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error };
}

export function useBlogPost(slug: string) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/dashboard/blog/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setBlogPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  return { blogPost, loading, error };
}

// Pages
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  featuredImage: string | null;
  order: number;
  status: string;
  isHomepage: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  authorId: string | null;
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/pages');
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        setPages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return { pages, loading, error };
}

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/dashboard/pages/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch page');
        }
        const data = await response.json();
        setPage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading, error };
}
