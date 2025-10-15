'use server';

import { compare } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { loginSchema, type AuthResult } from '@/schemas/schemas';
import { createSession, deleteSession } from '@/lib/auth';

const prisma = new PrismaClient();

export async function loginWithState(
  prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  // Validar dados
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Dados inválidos. Verifique os campos.'
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // Delay artificial para melhor UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        success: false,
        message: 'Email ou senha incorretos'
      };
    }

    // Verificar senha
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: 'Email ou senha incorretos'
      };
    }

    // Criar sessão
    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    return {
      success: true,
      message: 'Login realizado com sucesso!'
    };
  } catch (error) {
    console.error('Erro no login:', error);
    return {
      success: false,
      message: 'Erro ao fazer login. Tente novamente.'
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect('/yv-admin');
}
