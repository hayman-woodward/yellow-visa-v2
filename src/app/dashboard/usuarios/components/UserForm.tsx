'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YVTextField, YVSelect } from '@/components/YV';
import { Label } from '@/components/ui/label';
import { User, Eye, EyeOff } from 'lucide-react';
import { userSchema, updateUserSchema } from '@/schemas/dashboard/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

type UserFormProps = {
  defaultValues?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  };
  isEditing?: boolean;
};

export default function UserForm({
  defaultValues,
  isEditing = false
}: UserFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const schema = isEditing ? updateUserSchema : userSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange' as const,
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      password: '',
      confirmPassword: '',
      role: (defaultValues?.role as 'user' | 'admin') || 'user'
    }
  });

  const watchedFields = watch();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    setServerSuccess(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      };

      const url = isEditing && defaultValues?.id 
        ? `/api/dashboard/usuarios/${defaultValues.id}`
        : '/api/dashboard/usuarios';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setServerSuccess(result.message || 'Usuário salvo com sucesso!');
        setTimeout(() => {
          router.push('/dashboard/usuarios');
        }, 500);
      } else {
        setServerError(result.message || 'Erro ao salvar usuário');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setServerError('Erro interno do servidor');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      {/* Success Message */}
      {serverSuccess && (
        <div className='p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3'>
          <div className='w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
            <span className='text-green-600 text-xs font-bold'>✓</span>
          </div>
          <p className='text-sm text-green-800 flex-1'>{serverSuccess}</p>
        </div>
      )}

      {/* Error Message */}
      {serverError && (
        <div className='p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3'>
          <div className='w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
            <span className='text-red-600 text-xs font-bold'>!</span>
          </div>
          <p className='text-sm text-red-800 flex-1'>{serverError}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <Label htmlFor='name' className='mb-2 block'>
          Nome Completo
        </Label>
        <YVTextField
          id='name'
          type='text'
          placeholder='Ex: João Silva'
          {...register('name')}
          disabled={isSubmitting}
          error={errors.name?.message as string}
          showSuccess={
            touchedFields.name && !errors.name && !!watchedFields.name
          }
          variant='modern'
          size='md'
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor='email' className='mb-2 block'>
          E-mail
        </Label>
        <YVTextField
          id='email'
          type='email'
          placeholder='Ex: joao@email.com'
          {...register('email')}
          disabled={isSubmitting}
          error={errors.email?.message as string}
          showSuccess={
            touchedFields.email && !errors.email && !!watchedFields.email
          }
          variant='modern'
          size='md'
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor='password' className='mb-2 block'>
          {isEditing ? 'Nova Senha (opcional)' : 'Senha'}
        </Label>
        <YVTextField
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder={isEditing ? 'Deixe vazio para manter a senha atual' : 'Digite uma senha segura'}
          {...register('password')}
          disabled={isSubmitting}
          error={errors.password?.message as string}
          showSuccess={
            touchedFields.password && !errors.password && !!watchedFields.password
          }
          variant='modern'
          size='md'
          hasRightButton={true}
          rightIcon={
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-dashboard-muted hover:text-dashboard transition-colors'
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
      </div>

      {/* Confirm Password */}
      {!isEditing && (
        <div>
          <Label htmlFor='confirmPassword' className='mb-2 block'>
            Confirmar Senha
          </Label>
          <YVTextField
            id='confirmPassword'
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirme a senha'
            {...register('confirmPassword')}
            disabled={isSubmitting}
            error={errors.confirmPassword?.message as string}
            showSuccess={
              touchedFields.confirmPassword && !errors.confirmPassword && !!watchedFields.confirmPassword
            }
            variant='modern'
            size='md'
            hasRightButton={true}
            rightIcon={
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='text-dashboard-muted hover:text-dashboard transition-colors'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>
      )}

      {/* Role */}
      <div>
        <Label htmlFor='role' className='mb-2 block'>
          Função
        </Label>
        <YVSelect
          id='role'
          {...register('role')}
          disabled={isSubmitting}
          variant='modern'
          size='md'
          showSuccess={touchedFields.role && !!watchedFields.role}
          options={[
            { value: 'user', label: 'Usuário' },
            { value: 'admin', label: 'Administrador' },
            { value: 'super_admin', label: 'Super Administrador' },
            { value: 'content_creator', label: 'Criador de Conteúdo' }
          ]}
        />
      </div>

      {/* Divider */}
      <div className='border-t border-dashboard pt-4' />

      {/* Buttons */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={isSubmitting || !isValid}
          className='px-6 h-11 rounded-full bg-[#0F0005] text-[#FFBD1A] font-bold hover:bg-[#0F0005]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95'
        >
          {isSubmitting ? (
            <>
              <div className='w-4 h-4 border-2 border-[#FFBD1A]/30 border-t-[#FFBD1A] rounded-full animate-spin inline-block mr-2' />
              Salvando...
            </>
          ) : (
            isEditing ? 'Atualizar Usuário' : 'Criar Usuário'
          )}
        </button>

        {!isValid && Object.keys(touchedFields).length > 0 && (
          <p className='text-xs text-dashboard-muted'>
            Preencha todos os campos corretamente
          </p>
        )}

        <a
          href='/dashboard/usuarios'
          className='px-6 h-11 rounded-full text-sm font-medium text-dashboard-muted hover:text-dashboard hover:bg-dashboard-hover transition-colors flex items-center'
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}