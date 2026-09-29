import { z } from 'zod';
import { suggestQuestionSchema } from '@/features/question-suggestions/model/schemas';

export const createQuestionSuggestion = async (
  body: z.infer<typeof suggestQuestionSchema>,
) => {
  const response = await fetch('/api/questions/suggest', {
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
