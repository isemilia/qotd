import { z } from 'zod';
import { answerCardColors } from '@/features/answers/components/answer-card';

export const postAnswerBodySchema = z.object({
  questionId: z.uuid(),
  answer: z.string().trim().min(1).max(200),
  color: z.enum(answerCardColors),
});

export const postAnswerClientSchema = postAnswerBodySchema.pick({
  answer: true,
  color: true,
});
