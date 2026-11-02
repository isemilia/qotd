import { changePersonalDetailsClientSchema } from '@/features/auth/model/schemas';
import { z } from 'zod';

export const userRoles = ['user', 'moderator', 'admin'] as const;

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export const staffRoles = [UserRole.ADMIN, UserRole.MODERATOR];

export type PersonalDetailsFormValues = z.infer<
  typeof changePersonalDetailsClientSchema
>;
