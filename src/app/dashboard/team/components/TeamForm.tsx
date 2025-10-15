'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect } from '@/components/YV';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { teamMemberSchema, updateTeamMemberSchema } from '@/schemas/dashboard/team';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

interface TeamMember {
  id?: string;
  name: string;
  slug: string;
  position: string;
  bio: string | null;
  imageUrl: string | null;
  email: string | null;
  linkedin: string | null;
  order: number;
  status: string;
}

interface TeamFormProps {
  defaultValues?: TeamMember;
  isEditing?: boolean;
}

export default function TeamForm({ defaultValues, isEditing = false }: TeamFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const schema = isEditing ? updateTeamMemberSchema : teamMemberSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange' as const,
    defaultValues: {
      name: defaultValues?.name || '',
      slug: defaultValues?.slug || '',
      position: defaultValues?.position || '',
      bio: defaultValues?.bio || '',
      imageUrl: defaultValues?.imageUrl || '',
      email: defaultValues?.email || '',
      order: defaultValues?.order || 0,
      status: (defaultValues?.status as 'draft' | 'published') || 'draft'
    }
  });

  const watchedFields = watch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue('name', name);
    
    if (!isEditing) {
      const slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        name: data.name,
        slug: data.slug,
        position: data.position,
        bio: data.bio || null,
        imageUrl: data.imageUrl || null,
        email: data.email || null,
        order: Number(data.order) || 0,
        status: data.status
      };

      const url = isEditing && defaultValues?.slug
        ? `/api/dashboard/team/${defaultValues.slug}`
        : '/api/dashboard/team';
      
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing 
        ? { ...payload, newSlug: payload.slug }
        : payload;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok) {
        setServerSuccess(result.message || 'Membro da equipe salvo com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/team');
        }, 500);
      } else {
        setServerError(result.error || 'Erro ao salvar membro da equipe');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setServerError('Erro interno do servidor');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Success Message */}
      {serverSuccess && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-green-600 text-xs font-bold">✓</span>
          </div>
          <p className="text-sm text-green-800 flex-1">{serverSuccess}</p>
        </div>
      )}

      {/* Error Message */}
      {serverError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-red-600 text-xs font-bold">!</span>
          </div>
          <p className="text-sm text-red-800 flex-1">{serverError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Nome Completo
          </Label>
          <YVTextField
            id="name"
            type="text"
            placeholder="Digite o nome completo"
            {...register('name')}
            onChange={handleNameChange}
            disabled={isSubmitting}
            error={errors.name?.message as string}
            showSuccess={touchedFields.name && !errors.name && !!watchedFields.name}
            variant="modern"
            size="md"
          />
        </div>

        {/* Slug */}
        <div>
          <Label htmlFor="slug" className="mb-2 block">
            Slug
          </Label>
          <YVTextField
            id="slug"
            type="text"
            placeholder="nome-sobrenome"
            {...register('slug')}
            disabled={isSubmitting}
            error={errors.slug?.message as string}
            showSuccess={touchedFields.slug && !errors.slug && !!watchedFields.slug}
            variant="modern"
            size="md"
          />
        </div>

        {/* Cargo/Posição */}
        <div>
          <Label htmlFor="position" className="mb-2 block">
            Cargo/Posição
          </Label>
          <YVTextField
            id="position"
            type="text"
            placeholder="Ex: CEO, Consultor de Vistos"
            {...register('position')}
            disabled={isSubmitting}
            error={errors.position?.message as string}
            showSuccess={touchedFields.position && !errors.position && !!watchedFields.position}
            variant="modern"
            size="md"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <YVTextField
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            {...register('email')}
            disabled={isSubmitting}
            error={errors.email?.message as string}
            showSuccess={touchedFields.email && !errors.email && !!watchedFields.email}
            variant="modern"
            size="md"
          />
        </div>


        {/* Imagem URL */}
        <div>
          <Label htmlFor="imageUrl" className="mb-2 block">
            Imagem (URL)
          </Label>
          <YVTextField
            id="imageUrl"
            type="url"
            placeholder="https://exemplo.com/foto.jpg"
            {...register('imageUrl')}
            disabled={isSubmitting}
            error={errors.imageUrl?.message as string}
            showSuccess={touchedFields.imageUrl && !errors.imageUrl && !!watchedFields.imageUrl}
            variant="modern"
            size="md"
          />
        </div>

        {/* Ordem */}
        <div>
          <Label htmlFor="order" className="mb-2 block">
            Ordem de Exibição
          </Label>
          <YVTextField
            id="order"
            type="number"
            placeholder="0"
            {...register('order', { valueAsNumber: true })}
            disabled={isSubmitting}
            error={errors.order?.message as string}
            showSuccess={touchedFields.order && !errors.order && watchedFields.order !== undefined}
            variant="modern"
            size="md"
          />
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status" className="mb-2 block">
            Status
          </Label>
          <YVSelect
            id="status"
            {...register('status')}
            disabled={isSubmitting}
            error={errors.status?.message as string}
            variant="modern"
            size="md"
            options={[
              { value: 'draft', label: 'Rascunho' },
              { value: 'published', label: 'Publicado' }
            ]}
          />
        </div>
      </div>

      {/* Biografia */}
      <div>
        <Label htmlFor="bio" className="mb-2 block">
          Biografia
        </Label>
        <Textarea
          id="bio"
          placeholder="Conte um pouco sobre a experiência e formação do membro da equipe..."
          {...register('bio')}
          disabled={isSubmitting}
          rows={6}
          className="w-full px-3 py-2 border border-dashboard-border rounded-lg bg-dashboard text-dashboard-text focus:border-dashboard-accent focus:ring-2 focus:ring-dashboard-accent/20 focus:outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-6 h-11 rounded-full border border-dashboard-border text-dashboard hover:bg-dashboard-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar Membro' : 'Criar Membro'}
        </button>
      </div>

      {!isValid && Object.keys(touchedFields).length > 0 && (
        <p className="text-xs text-dashboard-muted text-center">
          Preencha todos os campos corretamente
        </p>
      )}
    </form>
  );
}