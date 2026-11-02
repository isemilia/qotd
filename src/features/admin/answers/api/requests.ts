import {
  AdminAnswer,
  AdminAnswerById,
  adminAnswerByIdSchema,
  adminAnswersResponseSchema,
  HideAnswerBody,
} from '@/features/admin/answers/model/schema';
import { GetAdminAnswersParams } from '@/features/admin/answers/model/types';
import { RequestStatus } from '@/server/model/types';
import { toSearchParams } from '@/server/utils/search-params';
import { Pagination } from '@/shared/model/schemas';

export const getAdminAnswers = async (params?: GetAdminAnswersParams) => {
  const paramsString = params ? '?' + toSearchParams(params) : '';
  const response = await fetch(`/api/admin/answers${paramsString}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: { answers: AdminAnswer[]; pagination: Pagination };
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminAnswersResponseSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};

export const getAdminAnswerById = async (answerId: string) => {
  const response = await fetch(`/api/admin/answers/${answerId}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: AdminAnswerById;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminAnswerByIdSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};

export const hideAdminAnswer = async ({
  answerId,
  body,
}: {
  answerId: string;
  body: HideAnswerBody;
}) => {
  const response = await fetch(`/api/admin/answers/${answerId}/hide`, {
    method: 'POST',
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

export const restoreAdminAnswer = async (answerId: string) => {
  const response = await fetch(`/api/admin/answers/${answerId}/restore`, {
    method: 'POST',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
