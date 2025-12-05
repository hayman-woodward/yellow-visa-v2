import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isValidPhoneNumber } from 'libphonenumber-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Valida telefone usando libphonenumber-js (funciona no servidor e cliente)
 * Usa a mesma biblioteca que react-phone-number-input usa internamente
 * @param phone - Número de telefone (formato E.164 ou nacional)
 * @returns true se válido, false caso contrário
 */
export function isValidPhone(phone: string | undefined | null): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  try {
    return isValidPhoneNumber(phone);
  } catch {
    return false;
  }
}

/**
 * Verifica se o telefone está parcialmente preenchido (pode estar sendo digitado)
 * @param phone - Número de telefone
 * @returns true se parece estar incompleto
 */
export function isPhoneIncomplete(phone: string | undefined | null): boolean {
  if (!phone || typeof phone !== 'string') {
    return true;
  }
  
  // Remove caracteres não numéricos exceto +
  const digits = phone.replace(/[^\d+]/g, '');
  
  // Se tem + mas menos de 12 caracteres, provavelmente está incompleto
  if (phone.startsWith('+')) {
    return digits.length < 12;
  }
  
  // Se não tem + e tem menos de 10 dígitos, está incompleto
  return digits.length < 10;
}

/**
 * Retorna mensagem de erro específica para o telefone
 * @param phone - Número de telefone
 * @returns Mensagem de erro ou null se válido
 */
export function getPhoneErrorMessage(phone: string | undefined | null): string | null {
  if (!phone || typeof phone !== 'string' || phone.trim() === '') {
    return 'Telefone é obrigatório';
  }
  
  if (isPhoneIncomplete(phone)) {
    return 'Telefone incompleto. Digite o número completo.';
  }
  
  if (!isValidPhone(phone)) {
    return 'Telefone inválido. Verifique o número digitado.';
  }
  
  return null;
}

/**
 * Normaliza telefone - retorna o telefone se válido usando react-phone-number-input, ou null se inválido
 * @param phone - Número de telefone (formato E.164 ou nacional)
 * @returns Telefone se válido, null caso contrário
 */
export function normalizePhone(phone: string | undefined | null): string | null {
  if (isValidPhone(phone)) {
    return phone || null;
  }
  return null;
}