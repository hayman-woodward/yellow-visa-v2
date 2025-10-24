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
            className='text-xs md:text-sm text-gray-800 font-semibold hover:underline'
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
          <Link href='/registro' className='text-gray-800 font-semibold hover:underline'>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
