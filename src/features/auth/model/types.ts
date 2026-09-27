import { changePersonalDetailsClientSchema } from '@/features/auth/model/schemas';
import { z } from 'zod';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export type PersonalDetailsFormValues = z.infer<
  typeof changePersonalDetailsClientSchema
>;
