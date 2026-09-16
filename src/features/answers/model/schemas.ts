import { z } from 'zod';

export const postAnswerBodySchema = z.object({
  questionId: z.uuid(),
  answer: z.string().trim().min(1).max(200),
});
