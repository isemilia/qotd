import { z } from 'zod';
import { postAnswerBodySchema } from '@/features/answers/model/schemas';
import { Answer, RequestStatus } from '@/server/model/types';

export const createAnswer = async (
  body: z.infer<typeof postAnswerBodySchema>,
) => {
  const response = await fetch('/api/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const getCurrentAnswers = async () => {
  const response = await fetch('/api/answers/current');

  const result: { status: RequestStatus; message: string; data: Answer[] } =
    await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const toggleAnswerLike = async (id: string) => {
  const response = await fetch(`/api/answers/${id}/likes`, { method: 'POST' });

  const result: { status: RequestStatus; message: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
