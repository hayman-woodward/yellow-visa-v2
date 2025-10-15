'use client';

import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AuthResult } from '@/schemas/schemas';

const initialState: AuthResult = { success: false };

type LoginFormProps = {
  action: (prevState: AuthResult, formData: FormData) => Promise<AuthResult>;
};

const LoginForm = ({ action }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const router = useRouter();

  // Redirecionar após login bem-sucedido
  useEffect(() => {
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.success, router]);

  return (
    <div>
      {/* Header */}
      <div className='mb-8 md:mb-10'>
        <h1 className='text-2xl md:text-3xl text-center xl:text-left font-bold text-gray-900 mb-2 md:mb-3'>
          Bem-vindo de volta
        </h1>
        <p className='text-gray-500 text-xs md:text-sm text-center xl:text-left'>
          Por favor, insira seus dados
        </p>
      </div>

      {/* Mensagem de erro/sucesso do server */}
      {state.message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm text-center ${
            state.success
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className='space-y-4 md:space-y-5'>
        {/* Google Button */}
        <Button
          type='button'
          variant='outline'
          className='w-full h-10 md:h-11 border-gray-300 hover:bg-gray-50 text-xs md:text-sm font-medium'
        >
          <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
            <path
              fill='#4285F4'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='#34A853'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='#FBBC05'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='#EA4335'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          Entrar com Google
        </Button>

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-xs md:text-sm'>
            <span className='bg-white px-2 text-gray-500'>ou</span>
          </div>
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor='email'
            className='block text-xs md:text-sm font-medium text-gray-700 mb-1'
          >
            E-mail
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='seu@email.com'
            className='w-full h-10 md:h-11 border-gray-300 focus:border-gray-400 focus:ring-gray-400 text-xs md:text-sm'
            required
            autoComplete='email'
            disabled={isPending}
          />
          {state.errors?.email && (
            <span className='text-xs text-red-600 mt-1 block'>
              {state.errors.email[0]}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor='password'
            className='block text-xs md:text-sm font-medium text-gray-700 mb-1'
          >
            Senha
          </label>
          <div className='relative'>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Digite sua senha'
              className='w-full h-10 md:h-11 border-gray-300 focus:border-gray-400 focus:ring-gray-400 pr-10 text-xs md:text-sm'
              required
              autoComplete='current-password'
              disabled={isPending}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              disabled={isPending}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {state.errors?.password && (
            <span className='text-xs text-red-600 mt-1 block'>
              {state.errors.password[0]}
            </span>
          )}
        </div>

        {/* Remember & Forgot */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember'
              name='remember'
              type='checkbox'
              className='h-4 w-4 text-black border-gray-300 rounded focus:ring-black'
            />
            <label
              htmlFor='remember'
              className='ml-2 text-xs md:text-sm text-gray-700'
            >
              Lembrar por 30 dias
            </label>
          </div>
          <Link
            href='/forgot'
            className='text-xs md:text-sm text-blue-600 hover:underline'
          >
            Esqueceu a senha?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type='submit'
          className='w-full h-10 md:h-11 bg-black hover:bg-gray-800 text-white text-xs md:text-sm font-medium disabled:opacity-50'
          disabled={isPending}
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>

        {/* Sign Up Link */}
        <p className='text-center text-xs md:text-sm text-gray-600'>
          Não tem uma conta?{' '}
          <Link href='/registro' className='text-blue-600 hover:underline'>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
