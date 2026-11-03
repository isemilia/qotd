import {
  getAdminUserById,
  getAdminUsers,
} from '@/features/admin/users/api/requests';
import { GetAdminUsersParams } from '@/features/admin/users/model/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetAdminUsers = (params?: GetAdminUsersParams) => {
  return useQuery({
    queryKey: ['adminUsers', params],
    queryFn: () => getAdminUsers(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAdminUserById = (userId?: string | null) => {
  return useQuery({
    queryKey: ['adminUserById'],
    queryFn: () => getAdminUserById(userId!),
    enabled: Boolean(userId),
  });
};
