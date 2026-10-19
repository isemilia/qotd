import { z } from 'zod';

export const approveSuggestionSchema = z.object({
  question: z.string().max(200).min(1),
  date: z.iso.date(),
  creditName: z.string().max(50).optional().nullable(),
});
