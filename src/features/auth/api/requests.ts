import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/features/auth/model/schemas';

export const createAccount = async (body: z.infer<typeof signUpSchema>) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const signIn = async (body: z.infer<typeof signInSchema>) => {
  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch('/api/auth/logout', { method: 'POST' });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
