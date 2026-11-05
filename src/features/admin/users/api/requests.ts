import {
  AdminUpdateUserBody,
  AdminUser,
  AdminUserById,
  adminUserByIdSchema,
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

export const getAdminUserById = async (userId: string) => {
  const response = await fetch(`/api/admin/users/${userId}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: AdminUserById;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminUserByIdSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};

export const updateAdminUser = async ({
  userId,
  body,
}: {
  userId: string;
  body: AdminUpdateUserBody;
}) => {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
