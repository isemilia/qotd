import { answerCardColors } from '@/features/answers/components/answer-card';
import { z } from 'zod';

export const postAnswerBodySchema = z.object({
  questionId: z.uuid(),
  answer: z.string().trim().min(1).max(200),
  color: z.enum(answerCardColors),
});

export const postAnswerClientSchema = postAnswerBodySchema.pick({
  answer: true,
  color: true,
});
