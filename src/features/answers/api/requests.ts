import { z } from 'zod';
import { postAnswerBodySchema } from '@/features/answers/model/schemas';

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

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
