'use client';

import React from 'react';
import { useTeamMember } from '@/hooks/useDashboardData';
import { YVText } from '@/components/YV';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import TeamForm from '../../components/TeamForm';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function EditarMembroPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ slug: string } | null>(null);
  
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const { member, loading, error } = useTeamMember(resolvedParams?.slug || '');

  if (loading) {
    return (
      <div className='space-y-6'>
        {/* Header Skeleton */}
        <div className='flex items-center gap-4'>
          <div className='p-2 rounded-lg bg-gray-200 animate-pulse w-10 h-10' />
          <div>
            <div className='h-8 w-32 bg-gray-200 rounded animate-pulse mb-2' />
            <div className='h-4 w-48 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>

        {/* Form Skeleton */}
        <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
          <div className='space-y-6'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/team'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>Erro</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-red-500'>{error}</YVText>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard/team'
            className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
          >
            <ArrowLeft size={20} className='text-dashboard-muted' />
          </Link>
          <div>
            <h1 className='text-2xl font-normal text-dashboard'>Membro não encontrado</h1>
          </div>
        </div>
        <div className='text-center py-12'>
          <YVText className='text-dashboard-muted'>
            O membro da equipe solicitado não foi encontrado
          </YVText>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link
          href='/dashboard/team'
          className='p-2 rounded-lg hover:bg-dashboard-hover transition-colors'
        >
          <ArrowLeft size={20} className='text-dashboard-muted' />
        </Link>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <Users size={28} className='text-[#FFBD1A]' />
            <h1 className='text-2xl font-normal text-dashboard'>Editar Membro</h1>
          </div>
          <YVText variant='small' className='text-dashboard-muted'>
            Edite as informações do membro da equipe
          </YVText>
        </div>
      </div>

      {/* Form */}
      <div className='bg-dashboard-card rounded-lg border border-dashboard p-6'>
        <TeamForm
          defaultValues={{
            id: member.id,
            name: member.name,
            slug: member.slug,
            position: member.position,
            bio: member.bio || '',
            imageUrl: member.imageUrl || '',
            email: member.email || '',
            linkedin: member.linkedin || '',
            order: member.order,
            status: member.status
          }}
          isEditing={true}
        />
      </div>
    </div>
  );
}
