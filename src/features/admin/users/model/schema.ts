import { paginationSchema } from '@/shared/model/schemas';
import { z } from 'zod';
import { userStatuses } from '@/features/admin/users/model/types';
import { userRoles } from '@/features/auth/model/types';

export const adminUserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string().nullable(),
  role: z.enum(userRoles),
  status: z.enum(userStatuses),
  termsAndGuidelinesAccepted: z.boolean(),
  createdAt: z.iso.datetime(),
});

export const adminUsersResponseSchema = z.object({
  users: z.array(adminUserSchema),
  pagination: paginationSchema,
});

export type AdminUser = z.infer<typeof adminUserSchema>;
