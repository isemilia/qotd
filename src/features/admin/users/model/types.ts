import { UserRole } from '@/features/auth/model/types';

export const userStatuses = ['active', 'deleted'] as const;

export type UserStatus = (typeof userStatuses)[number];

export type GetAdminUsersParams = {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  pageSize?: number;
};
