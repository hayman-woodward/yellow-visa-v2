'use client';

import React from 'react';
import { Eye, Calendar, User, Tag, Globe } from 'lucide-react';
import YVHtmlRender from '@/components/YV/YVHtmlRender';

interface BlogPreviewProps {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured?: boolean;
  className?: string;
}

export function BlogPreview({
  title,
  content,
  excerpt,
  category,
  tags,
  featuredImage,
  metaTitle,
  metaDescription,
  status,
  isFeatured,
  className = ''
}: BlogPreviewProps) {
  const tagList = tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <Eye size={16} className="text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-700">Preview do Post</h3>
          <div className="ml-auto flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${status === 'published' ? 'bg-green-100 text-green-800' :
                status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
              }`}>
              {status === 'published' ? 'Publicado' : status === 'draft' ? 'Rascunho' : 'Arquivado'}
            </span>
            {isFeatured && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#FFBD1A] text-black">
                Destaque
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-6">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-48 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {title || 'Título do post...'}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          {category && (
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>{category}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>Admin</span>
          </div>
        </div>

        {/* Tags */}
        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tagList.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <div className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-[#FFBD1A] pl-4">
              {excerpt}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          {content ? (
            <YVHtmlRender content={content} />
          ) : (
            <div className="text-gray-500 italic">
              Conteúdo do post aparecerá aqui...
            </div>
          )}
        </div>

        {/* SEO Preview */}
        {(metaTitle || metaDescription) && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={16} className="text-gray-600" />
              <h4 className="text-sm font-semibold text-gray-700">Preview nos Resultados de Busca</h4>
            </div>

            <div className="space-y-2">
              <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                {metaTitle || title || 'Título do post...'}
              </div>
              <div className="text-green-600 text-sm">
                https://yellowvisa.com.br/blog/{title?.toLowerCase().replace(/\s+/g, '-') || 'post-slug'}
              </div>
              <div className="text-gray-600 text-sm">
                {metaDescription || excerpt || 'Descrição do post...'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
