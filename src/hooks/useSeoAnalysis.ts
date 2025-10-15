'use client';

import { useMemo } from 'react';

export interface SeoAnalysis {
  title: {
    score: 'good' | 'ok' | 'bad';
    message: string;
    suggestions: string[];
  };
  content: {
    score: 'good' | 'ok' | 'bad';
    message: string;
    suggestions: string[];
  };
  metaDescription: {
    score: 'good' | 'ok' | 'bad';
    message: string;
    suggestions: string[];
  };
  keywords: {
    score: 'good' | 'ok' | 'bad';
    message: string;
    suggestions: string[];
  };
}

export interface SeoAnalysisData {
  title: string;
  content: string;
  metaDescription: string;
  metaKeywords: string;
}

export function useSeoAnalysis(data: SeoAnalysisData): SeoAnalysis {
  return useMemo(() => {
    // Garantir que data não seja undefined
    const safeData = data || {
      title: '',
      content: '',
      metaDescription: '',
      metaKeywords: ''
    };
    
    const { title, content, metaDescription, metaKeywords } = safeData;

    const analysis: SeoAnalysis = {
      title: {
        score: 'good' as 'good' | 'ok' | 'bad',
        message: 'Título otimizado',
        suggestions: [] as string[]
      },
      content: {
        score: 'good' as 'good' | 'ok' | 'bad',
        message: 'Conteúdo adequado',
        suggestions: [] as string[]
      },
      metaDescription: {
        score: 'good' as 'good' | 'ok' | 'bad',
        message: 'Meta description otimizada',
        suggestions: [] as string[]
      },
      keywords: {
        score: 'good' as 'good' | 'ok' | 'bad',
        message: 'Palavras-chave adequadas',
        suggestions: [] as string[]
      }
    };

    // Análise do título
    if (title.length === 0) {
      analysis.title = { 
        score: 'bad', 
        message: 'Adicione um título', 
        suggestions: ['O título é obrigatório para SEO'] 
      };
    } else if (title.length < 30) {
      analysis.title = { 
        score: 'ok', 
        message: 'Título muito curto', 
        suggestions: ['Tente usar entre 30-60 caracteres'] 
      };
    } else if (title.length > 60) {
      analysis.title = { 
        score: 'ok', 
        message: 'Título muito longo', 
        suggestions: ['Reduza para 60 caracteres ou menos'] 
      };
    } else {
      analysis.title = { 
        score: 'good', 
        message: 'Título otimizado', 
        suggestions: ['Perfeito! Tamanho ideal para SEO'] 
      };
    }

    // Análise do conteúdo
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount === 0) {
      analysis.content = { 
        score: 'bad', 
        message: 'Adicione conteúdo', 
        suggestions: ['O conteúdo é obrigatório'] 
      };
    } else if (wordCount < 300) {
      analysis.content = { 
        score: 'ok', 
        message: 'Conteúdo muito curto', 
        suggestions: ['Tente escrever pelo menos 300 palavras'] 
      };
    } else if (wordCount > 2000) {
      analysis.content = { 
        score: 'ok', 
        message: 'Conteúdo muito longo', 
        suggestions: ['Considere dividir em seções menores'] 
      };
    } else {
      analysis.content = { 
        score: 'good', 
        message: 'Conteúdo adequado', 
        suggestions: [`${wordCount} palavras - Tamanho ideal!`] 
      };
    }

    // Análise da meta description
    if (metaDescription.length === 0) {
      analysis.metaDescription = { 
        score: 'bad', 
        message: 'Adicione meta description', 
        suggestions: ['Meta description melhora o SEO'] 
      };
    } else if (metaDescription.length < 120) {
      analysis.metaDescription = { 
        score: 'ok', 
        message: 'Meta description curta', 
        suggestions: ['Tente usar entre 120-160 caracteres'] 
      };
    } else if (metaDescription.length > 160) {
      analysis.metaDescription = { 
        score: 'ok', 
        message: 'Meta description longa', 
        suggestions: ['Reduza para 160 caracteres ou menos'] 
      };
    } else {
      analysis.metaDescription = { 
        score: 'good', 
        message: 'Meta description otimizada', 
        suggestions: ['Tamanho perfeito para SEO!'] 
      };
    }

    // Análise das palavras-chave
    if (metaKeywords.length === 0) {
      analysis.keywords = { 
        score: 'ok', 
        message: 'Adicione palavras-chave', 
        suggestions: ['Palavras-chave ajudam no SEO'] 
      };
    } else {
      const keywordCount = metaKeywords.split(',').filter(k => k.trim().length > 0).length;
      if (keywordCount < 3) {
        analysis.keywords = { 
          score: 'ok', 
          message: 'Poucas palavras-chave', 
          suggestions: ['Tente usar 3-5 palavras-chave relevantes'] 
        };
      } else if (keywordCount > 10) {
        analysis.keywords = { 
          score: 'ok', 
          message: 'Muitas palavras-chave', 
          suggestions: ['Foque em 5-8 palavras-chave principais'] 
        };
      } else {
        analysis.keywords = { 
          score: 'good', 
          message: 'Palavras-chave adequadas', 
          suggestions: [`${keywordCount} palavras-chave - Perfeito!`] 
        };
      }
    }

    return analysis;
  }, [data]);
}
