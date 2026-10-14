import { questionStatuses } from '@/features/admin/questions/model/types';
import { z } from 'zod';
import { paginationSchema } from '@/shared/model/schemas';

export const adminQuestionSchema = z.object({
  id: z.uuid(),
  question: z.string(),
  creditName: z.string().nullable(),
  date: z.iso.date(),
  status: z.enum(questionStatuses),
});

export const adminQuestionResponseSchema = z.object({
  questions: z.array(adminQuestionSchema),
  pagination: paginationSchema,
});

export type AdminQuestion = z.infer<typeof adminQuestionSchema>;

export const createAdminQuestionSchema = z.object({
  question: z.string().max(200).min(1),
  date: z.iso.date(),
  creditName: z.string().max(50).optional().nullable(),
});
