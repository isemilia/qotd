import { z } from 'zod';
import { signUpSchema } from '@/features/auth/model/schemas';

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
