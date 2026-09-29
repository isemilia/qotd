import { z } from 'zod';

export const suggestQuestionSchema = z.object({
  creditName: z.string().max(50).optional(),
  question: z.string().max(200),
});
