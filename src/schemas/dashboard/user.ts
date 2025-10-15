import { z } from 'zod';

// Schema de validação de usuário (usado no client e server)
export const userSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
      .regex(/[@#$%^&*(),.?":{}|<>]/, 'Deve conter um caractere especial'),
    confirmPassword: z.string(),
    role: z.enum(['user', 'admin', 'super_admin', 'content_creator'])
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  });

// Schema para atualização (senha opcional)
export const updateUserSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .refine(
        (val) => {
          // Se vazio, ok (não vai atualizar senha)
          if (val.length === 0) return true;
          // Se tem conteúdo, valida
          return (
            val.length >= 6 &&
            /[A-Z]/.test(val) &&
            /[@#$%^&*(),.?":{}|<>]/.test(val)
          );
        },
        {
          message:
            'Senha deve ter pelo menos 6 caracteres, 1 maiúscula e 1 caractere especial'
        }
      )
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
    role: z.enum(['user', 'admin', 'super_admin', 'content_creator'])
  })
  .refine(
    (data) => {
      // Se a senha estiver vazia (modo edição sem alterar senha), não valida
      if (!data.password || data.password === '') return true;
      // Se tem senha, deve ter confirmação e devem ser iguais
      return data.password === data.confirmPassword;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword']
    }
  );

// Schema apenas com os campos que vão pro backend (sem confirmPassword)
export const userBackendSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(
      /[@#$%^&*(),.?":{}|<>]/,
      'Senha deve conter pelo menos um caractere especial (@, #, $, etc)'
    ),
  role: z.enum(['user', 'admin', 'super_admin'])
});

export const updateUserBackendSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .refine(
      (val) => {
        // Se vazio, ok (não vai atualizar senha)
        if (val.length === 0) return true;
        // Se tem conteúdo, valida
        return (
          val.length >= 6 &&
          /[A-Z]/.test(val) &&
          /[@#$%^&*(),.?":{}|<>]/.test(val)
        );
      },
      {
        message:
          'Senha deve ter pelo menos 6 caracteres, 1 maiúscula e 1 caractere especial'
      }
    )
    .optional()
    .or(z.literal('')),
  role: z.enum(['user', 'admin', 'super_admin'])
});
