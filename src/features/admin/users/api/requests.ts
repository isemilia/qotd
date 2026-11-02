import {
  AdminUser,
  adminUsersResponseSchema,
} from '@/features/admin/users/model/schema';
import { GetAdminUsersParams } from '@/features/admin/users/model/types';
import { RequestStatus } from '@/server/model/types';
import { toSearchParams } from '@/server/utils/search-params';
import { Pagination } from '@/shared/model/schemas';

export const getAdminUsers = async (params?: GetAdminUsersParams) => {
  const paramsString = params ? '?' + toSearchParams(params) : '';
  const response = await fetch(`/api/admin/users${paramsString}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: { users: AdminUser[]; pagination: Pagination };
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminUsersResponseSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};
