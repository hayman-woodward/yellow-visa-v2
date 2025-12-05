import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isValidPhoneNumber } from 'libphonenumber-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Valida telefone usando libphonenumber-js (mesma lib que react-phone-number-input usa)
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
 * Normaliza telefone - retorna o telefone se válido usando libphonenumber-js, ou null se inválido
 * @param phone - Número de telefone (formato E.164 ou nacional)
 * @returns Telefone se válido, null caso contrário
 */
export function normalizePhone(phone: string | undefined | null): string | null {
  if (isValidPhone(phone)) {
    return phone || null;
  }
  return null;
}