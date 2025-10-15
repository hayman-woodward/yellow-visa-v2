import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY =
  process.env.AUTH_SECRET || 'your-secret-key-change-in-production';
const key = new TextEncoder().encode(SECRET_KEY);

export type SessionData = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

// Criar token JWT e sessão
export async function createSession(data: SessionData) {
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 dias
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 dias
  });

  return token;
}

// Verificar e obter sessão
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key);
    return payload as SessionData;
  } catch {
    return null;
  }
}

// Deletar sessão
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
