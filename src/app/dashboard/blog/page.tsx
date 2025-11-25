'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, BookOpen, Pencil, Trash2, Eye, Calendar, Tag, Star, Globe, MoreHorizontal, Search, Filter, Download, Archive, CheckSquare } from 'lucide-react';
import { YVButton, YVTitle, YVText, YVTable, YVTableRow, YVTableCell, YVTableAvatar, YVTableBadge, YVTableActions, YVTextField, YVSelect } from '@/components/YV';
import { YVSkeletonList } from '@/components/YV';
import { useBlogPosts } from '@/hooks/useDashboardData';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { generateSlug } from '@/utils/generateSlug';

export default function BlogPage() {
  const { blogPosts, loading, error } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  if (loading) {
    return <YVSkeletonList />;
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <YVTitle variant='heading' className='text-red-500'>Erro ao carregar posts do blog</YVTitle>
        <YVText>{error}</YVText>
      </div>
    );
  }

  // Filtrar posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Categorias únicas
  const categories = [...new Set(blogPosts.map(post => post.category).filter(Boolean))] as string[];

  // Bulk actions
  const handleBulkAction = () => {
    if (bulkAction === 'publish') {
      console.log('Publicar posts:', selectedPosts);
    } else if (bulkAction === 'archive') {
      console.log('Arquivar posts:', selectedPosts);
    } else if (bulkAction === 'delete') {
      console.log('Excluir posts:', selectedPosts);
    }
    setSelectedPosts([]);
    setBulkAction('');
  };

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const selectAllPosts = () => {
    // Se todos estão selecionados, desmarca todos
    if (selectedPosts.length === filteredPosts.length && filteredPosts.length > 0) {
      setSelectedPosts([]);
    } else {
      // Senão, seleciona todos
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleDeletePost = async (slug: string, title: string) => {
    if (!slug || slug.trim() === '') {
      console.error('❌ Slug vazio ou inválido:', slug);
      alert('Erro: Slug inválido');
      return;
    }

    if (!confirm(`Tem certeza que deseja deletar o post "${title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    console.log('🗑️ Deleting post from list with slug:', slug);
    setDeletingSlug(slug);
    
    try {
      const response = await fetch(`/api/dashboard/blog/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Post deleted successfully from list');
        // Recarregar a página para atualizar a lista
        window.location.reload();
      } else {
        console.error('❌ Erro ao deletar post:', data);
        alert('Erro ao deletar post: ' + (data.message || data.error || 'Erro desconhecido'));
        setDeletingSlug(null);
      }
    } catch (error) {
      console.error('❌ Erro ao deletar post:', error);
      alert('Erro ao deletar post. Tente novamente.');
      setDeletingSlug(null);
    }
  };

  return (
    <div className='space-y-6'>
      <DashboardHeader
        title="Blog"
        icon={BookOpen}
        count={filteredPosts.length}
        countLabel="posts"
        buttonText="Novo Post"
        buttonVariant='outline'
        buttonIcon={Plus}
        buttonHref="/dashboard/blog/novo"
      />

      {/* Filtros e Busca */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-4'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Busca */}
          <div className='flex-1'>
            <YVTextField
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant='modern'
              size='md'
              className='w-full'
            />
          </div>

          {/* Filtros */}
          <div className='flex gap-3'>
            <YVSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Todos os Status' },
                { value: 'published', label: 'Publicados' },
                { value: 'draft', label: 'Rascunhos' },
                { value: 'archived', label: 'Arquivados' }
              ]}
              variant='modern'
              size='md'
            />

            <YVSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Todas as Categorias' },
                ...categories.map(cat => ({ value: cat, label: cat }))
              ]}
              variant='modern'
              size='md'
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPosts.length > 0 && (
          <div className='mt-4 p-3 bg-[#FFBD1A]/10 rounded-lg border border-[#FFBD1A]/20'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-dashboard'>
                {selectedPosts.length} posts selecionados
              </span>
              <YVSelect
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                options={[
                  { value: '', label: 'Ações em lote' },
                  { value: 'publish', label: 'Publicar' },
                  { value: 'archive', label: 'Arquivar' },
                  { value: 'delete', label: 'Excluir' }
                ]}
                variant='modern'
                size='md'
                className='w-40'
              />
              <Button
                size="sm"
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className='bg-[#0F0005] hover:bg-[#0F0005]/90 text-[#FFBD1A]'
              >
                Aplicar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedPosts([])}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Tabela */}
      <YVTable
        headers={['', 'Post', 'Autor', 'Categoria', 'Status', 'Data', '']}
        headerColSpans={['col-span-1', 'col-span-4', 'col-span-2', 'col-span-2', 'col-span-1', 'col-span-1', 'col-span-1']}
        loading={loading}
        emptyMessage="Nenhum post encontrado"
      >
        {filteredPosts.length === 0 ? (
          <YVTableRow>
            <YVTableCell colSpan={7} className='text-center py-8 text-gray-500'>
              Nenhum post encontrado
            </YVTableCell>
          </YVTableRow>
        ) : (
          <>
            {/* Select All Row */}
            <YVTableRow className='bg-gray-50'>
              <YVTableCell className='col-span-1'>
                <input
                  type="checkbox"
                  checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                  onChange={selectAllPosts}
                  className='rounded border-gray-300'
                />
              </YVTableCell>
              <YVTableCell colSpan={6} className='col-span-6'>
                <span className='text-sm text-gray-600'>
                  Selecionar todos ({filteredPosts.length} posts)
                </span>
              </YVTableCell>
            </YVTableRow>

            {filteredPosts.map((post) => (
              <YVTableRow key={post.id} className='py-4'>
                <YVTableCell className='col-span-1'>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => togglePostSelection(post.id)}
                    className='rounded border-gray-300'
                  />
                </YVTableCell>
                <YVTableCell className='col-span-4'>
                  <div className='flex items-start gap-3'>
                    <YVTableAvatar icon={<BookOpen size={16} />} />
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-medium text-gray-900 text-base leading-tight'>
                          {post.title}
                        </h4>
                        {post.isFeatured && (
                          <Badge variant="secondary" className='text-xs'>
                            <Star size={10} className='mr-1' />
                            Destaque
                          </Badge>
                        )}
                      </div>
                      {post.excerpt && (
                        <p className='text-sm text-gray-600 line-clamp-1'>
                          {post.excerpt}
                        </p>
                      )}
                      <div className='flex items-center gap-3 mt-1 text-xs text-gray-500'>
                        {post.tags && (
                          <span className='bg-gray-100 px-2 py-1 rounded'>
                            {post.tags.split(',').length} tags
                          </span>
                        )}
                        {(post.metaTitle || post.metaDescription) && (
                          <span className='flex items-center gap-1'>
                            <Globe size={10} />
                            SEO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </YVTableCell>
                <YVTableCell className='col-span-2'>
                  <div className='text-sm text-gray-600'>Admin</div>
                </YVTableCell>
                <YVTableCell className='col-span-2'>
                  <div className='text-sm text-gray-600'>
                    {post.category || '-'}
                  </div>
                </YVTableCell>
                <YVTableCell className='col-span-1'>
                  <YVTableBadge
                    variant={post.status === 'published' ? 'success' :
                      post.status === 'draft' ? 'warning' : 'default'}
                  >
                    {post.status === 'published' ? 'Publicado' :
                      post.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                  </YVTableBadge>
                </YVTableCell>
                <YVTableCell className='col-span-1'>
                  <div className='text-sm text-gray-500'>
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </YVTableCell>
                <YVTableCell className='col-span-1'>
                  <YVTableActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className='h-8 w-8 p-0 ml-auto'>
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {post.status === 'published' && (
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.category ? generateSlug(post.category) : 'blog'}/${post.slug}`} className='flex items-center gap-2 py-2'>
                              <Eye size={14} className='flex-shrink-0' />
                              <span>Visualizar</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/blog/${post.slug}/editar`} className='flex items-center gap-2 py-2'>
                            <Pencil size={14} className='flex-shrink-0' />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className='flex items-center gap-2 py-2 text-red-600 cursor-pointer'
                          onClick={() => handleDeletePost(post.slug, post.title)}
                          disabled={deletingSlug === post.slug}
                        >
                          <Trash2 size={14} className='flex-shrink-0' />
                          <span>{deletingSlug === post.slug ? 'Excluindo...' : 'Excluir'}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </YVTableActions>
                </YVTableCell>
              </YVTableRow>
            ))}
          </>
        )}
      </YVTable>
    </div>
  );
}