import { userStatuses } from '@/features/admin/users/model/types';
import { userRoles } from '@/features/auth/model/types';
import { paginationSchema } from '@/shared/model/schemas';
import { z } from 'zod';

export const adminUserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string().nullable(),
  role: z.enum(userRoles),
  status: z.enum(userStatuses),
  termsAndGuidelinesAccepted: z.boolean(),
  lastLoginAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});

export const adminUsersResponseSchema = z.object({
  users: z.array(adminUserSchema),
  pagination: paginationSchema,
});

export type AdminUser = z.infer<typeof adminUserSchema>;

export const adminUserByIdSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string().nullable(),
  role: z.enum(userRoles),
  status: z.enum(userStatuses),
  termsAndGuidelinesAccepted: z.boolean(),
  lastLoginAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),

  totalAnswers: z.number().int().nonnegative(),
  hiddenAnswers: z.number().int().nonnegative(),
  suggestedQuestions: z.number().int().nonnegative(),

  lastAnswerAt: z.iso.datetime().nullable(),
  lastSuggestionAt: z.iso.datetime().nullable(),
});

export type AdminUserById = z.infer<typeof adminUserByIdSchema>;

export const adminUpdateUserBody = z
  .object({
    role: z.enum(userRoles).optional(),
    status: z.enum(userStatuses).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type AdminUpdateUserBody = z.infer<typeof adminUpdateUserBody>;

export const adminChangeUserRoleForm = z.object({
  role: z.enum(userRoles),
});

export type UpdateAdminUserForm = z.infer<typeof adminChangeUserRoleForm>;
