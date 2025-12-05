'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { normalizePhone } from '@/lib/utils';

const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres')
});

export type ContactResult = {
  success: boolean;
  message?: string;
  errors?: string;
};

export async function submitContactForm(
  prevState: ContactResult,
  formData: FormData
): Promise<ContactResult> {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string
    };

    const validated = contactSchema.parse(data) as {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    };

    // Validar telefone antes de salvar
    const phoneValidated = normalizePhone(validated.phone);

    await prisma.contact.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: phoneValidated,
        subject: validated.subject,
        message: validated.message
      }
    });

    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return {
        success: false,
        message: 'Dados inválidos',
        errors: error.message
      };
    }

    return {
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente.'
    };
  }
}
