'use client';

import React from 'react';
import { ChevronDown, ChevronUp, Settings, Image } from 'lucide-react';
import { useSeoAnalysis, SeoAnalysisData } from '@/hooks/useSeoAnalysis';

interface SeoAnalysisPanelProps {
  data: SeoAnalysisData;
  expanded?: boolean;
  onToggle?: () => void;
  activeTab?: 'general' | 'social';
  onTabChange?: (tab: 'general' | 'social') => void;
  children?: React.ReactNode;
  className?: string;
}

export function SeoAnalysisPanel({
  data,
  expanded = false,
  onToggle,
  activeTab = 'general',
  onTabChange,
  children,
  className = ''
}: SeoAnalysisPanelProps) {
  const seoAnalysis = useSeoAnalysis(data);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="px-6 py-3 h-fit">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-3 text-gray-900 hover:text-[#FFBD1A] transition-colors w-full cursor-pointer hover:bg-gray-50 rounded-lg p-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#FFBD1A] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Y</span>
            </div>
            <h3 className="text-base font-semibold">SEO</h3>
          </div>
          <div className="ml-auto">
            {expanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </button>

        {expanded && (
          <div className="space-y-4 py-4">
            {/* Painel de Análise SEO - Estilo Yoast */}
            <div className="bg-gradient-to-r from-[#FFBD1A]/10 to-[#FFBD1A]/5 border border-[#FFBD1A]/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-[#FFBD1A] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Y</span>
                </div>
                <h4 className="text-base font-semibold text-gray-900">Análise de SEO</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Título */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${seoAnalysis.title.score === 'good' ? 'bg-green-500' :
                    seoAnalysis.title.score === 'ok' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{seoAnalysis.title.message}</p>
                    <p className="text-xs text-gray-600">{seoAnalysis.title.suggestions[0]}</p>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${seoAnalysis.content.score === 'good' ? 'bg-green-500' :
                    seoAnalysis.content.score === 'ok' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{seoAnalysis.content.message}</p>
                    <p className="text-xs text-gray-600">{seoAnalysis.content.suggestions[0]}</p>
                  </div>
                </div>

                {/* Meta Description */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${seoAnalysis.metaDescription.score === 'good' ? 'bg-green-500' :
                    seoAnalysis.metaDescription.score === 'ok' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{seoAnalysis.metaDescription.message}</p>
                    <p className="text-xs text-gray-600">{seoAnalysis.metaDescription.suggestions[0]}</p>
                  </div>
                </div>

                {/* Palavras-chave */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${seoAnalysis.keywords.score === 'good' ? 'bg-green-500' :
                    seoAnalysis.keywords.score === 'ok' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{seoAnalysis.keywords.message}</p>
                    <p className="text-xs text-gray-600">{seoAnalysis.keywords.suggestions[0]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abas do SEO */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6">
                <button
                  type="button"
                  onClick={() => onTabChange?.('general')}
                  className={`py-1 px-1 border-b-2 font-medium text-sm cursor-pointer transition-all duration-200 ${activeTab === 'general'
                    ? 'border-[#FFBD1A] text-[#FFBD1A]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Settings size={16} className="inline mr-2" />
                  Geral
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange?.('social')}
                  className={`py-1 px-1 border-b-2 font-medium text-sm cursor-pointer transition-all duration-200 ${activeTab === 'social'
                    ? 'border-[#FFBD1A] text-[#FFBD1A]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image size={16} className="inline mr-2" />
                  Redes Sociais
                </button>
              </nav>
            </div>

            {/* Conteúdo das Abas */}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
