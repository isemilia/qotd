import { z } from 'zod';

export const suggestQuestionSchema = z.object({
  creditName: z.string().max(50).optional().nullable(),
  question: z.string().max(200).min(1),
});

export const suggestQuestionClientSchema = suggestQuestionSchema;
