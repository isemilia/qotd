import { z } from 'zod';
import { paginationSchema } from '@/shared/model/schemas';
import { adminQuestionSchema } from '@/features/admin/questions/model/schema';
import { suggestionStatuses } from '@/features/admin/suggestions/model/types';
import { adminRejectionReasonKeys } from '@/features/admin/suggestions/model/constants';

export const approveSuggestionSchema = z.object({
  suggestedQuestion: z.string().max(200).min(1),
  date: z.iso.date(),
  creditName: z.string().max(50).optional().nullable(),
});

export type ApproveAdminSuggestionBody = z.infer<
  typeof approveSuggestionSchema
>;

export const rejectSuggestionSchema = z.object({
  reason: z.string().trim().min(1).max(200),
});

export type RejectAdminSuggestionBody = z.infer<typeof rejectSuggestionSchema>;

export const adminSuggestionSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  creditName: z.string().nullable(),
  suggestedQuestion: z.string(),
  status: z.enum(suggestionStatuses),
  reason: z.string().nullable(),
  createdAt: z.iso.datetime(),
  scheduledQuestion: z
    .object({
      id: z.uuid(),
      question: z.string(),
      date: z.iso.date(),
      creditName: z.string().nullable(),
    })
    .nullable(),
});

export const adminSuggestionResponseSchema = z.object({
  suggestions: z.array(adminSuggestionSchema),
  pagination: paginationSchema,
});

export type AdminSuggestion = z.infer<typeof adminQuestionSchema>;

export const rejectAdminSuggestionForm = z.object({
  reason: z.enum(adminRejectionReasonKeys),
  otherReason: z.string().max(200).optional().nullable(),
});

export type RejectAdminSuggestionForm = z.infer<
  typeof rejectAdminSuggestionForm
>;
