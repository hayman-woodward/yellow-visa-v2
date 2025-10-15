'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { YVTextField } from '@/components/YV';
import { submitContactForm } from '@/lib/actions/contact';
import { useFormState } from 'react-dom';

const initialState = {
  success: false,
  message: '',
  errors: undefined
};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nome *</Label>
        <YVTextField
          id='name'
          name='name'
          type='text'
          required
          error={state.errors}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email *</Label>
        <YVTextField
          id='email'
          name='email'
          type='email'
          required
          error={state.errors}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>Telefone</Label>
        <YVTextField
          id='phone'
          name='phone'
          type='tel'
          error={state.errors}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='subject'>Assunto *</Label>
        <YVTextField
          id='subject'
          name='subject'
          type='text'
          required
          error={state.errors}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>Mensagem *</Label>
        <Textarea
          id='message'
          name='message'
          rows={5}
          required
          className={state.errors ? 'border-red-500' : ''}
        />
        {state.errors && (
          <p className='text-sm text-red-500'>
            {state.errors}
          </p>
        )}
      </div>

      {state.message && (
        <Alert
          className={state.success ? 'border-green-500' : 'border-red-500'}
        >
          <AlertDescription
            className={state.success ? 'text-green-700' : 'text-red-700'}
          >
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      <button
        type='submit'
        className='w-full rounded-[999px] font-bold transition-all duration-200 focus:outline-none active:scale-95 flex items-center justify-center gap-1 h-12 px-6 bg-[#0F0005] text-[#FFBD1A] hover:bg-[#0F0005]/90'
      >
        Enviar Mensagem
      </button>
    </form>
  );
}
