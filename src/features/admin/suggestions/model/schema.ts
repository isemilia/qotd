import { z } from 'zod';

export const approveSuggestionSchema = z.object({
  question: z.string().max(200).min(1),
  date: z.iso.date(),
  creditName: z.string().max(50).optional().nullable(),
});

export const rejectSuggestionSchema = z.object({
  reason: z.string().trim().min(1).max(200),
});
