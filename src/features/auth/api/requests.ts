import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/features/auth/model/schemas';
import { PublicUser, RequestStatus } from '@/server/model/types';

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

export const getMe = async () => {
  const response = await fetch('/api/auth/me');

  const result: { message: string; status: RequestStatus; data: PublicUser } =
    await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
