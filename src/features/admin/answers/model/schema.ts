import { z } from 'zod';
import { answerStatuses } from '@/features/admin/answers/model/types';
import { paginationSchema } from '@/shared/model/schemas';

const adminAnswerUserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  role: z.string(),
  status: z.string(),
  createdAt: z.string().datetime({ offset: true }),
});

export const adminAnswerSchema = z.object({
  id: z.uuid(),
  answer: z.string(),
  status: z.enum(answerStatuses),

  moderation: z.object({
    reason: z.string().nullable(),
    moderatedAt: z.string().datetime({ offset: true }).nullable(),
    moderatedBy: z.uuid().nullable(),
  }),

  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),

  user: adminAnswerUserSchema,

  question: z.object({
    id: z.uuid(),
    question: z.string(),
    date: z.string(),
    creditName: z.string().nullable(),
  }),
});

export const adminAnswerByIdSchema = adminAnswerSchema.extend({
  user: adminAnswerUserSchema.extend({
    hiddenAnswers: z.number(),
    totalAnswers: z.number(),
  }),
});

export type AdminAnswer = z.infer<typeof adminAnswerSchema>;
export type AdminAnswerById = z.infer<typeof adminAnswerByIdSchema>;

export const adminAnswersResponseSchema = z.object({
  answers: z.array(adminAnswerSchema),
  pagination: paginationSchema,
});
