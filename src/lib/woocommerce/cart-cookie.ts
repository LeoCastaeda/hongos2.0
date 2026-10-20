import { cookies } from 'next/headers';
import { CART_TOKEN_COOKIE } from './store-cart';

export async function readCartToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(CART_TOKEN_COOKIE)?.value ?? null;
}

export async function writeCartToken(token: string | null) {
  const jar = await cookies();
  if (!token) {
    jar.delete(CART_TOKEN_COOKIE);
    return;
  }
  jar.set(CART_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });
}
