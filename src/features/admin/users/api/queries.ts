import { GetAdminUsersParams } from '@/features/admin/users/model/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAdminUsers } from '@/features/admin/users/api/requests';

export const useGetAdminUsers = (params?: GetAdminUsersParams) => {
  return useQuery({
    queryKey: ['adminUsers', params],
    queryFn: () => getAdminUsers(params),
    placeholderData: keepPreviousData,
  });
};
