import { toSearchParams } from '@/server/utils/search-params';
import { RequestStatus } from '@/server/model/types';
import { Pagination } from '@/shared/model/schemas';
import { GetAdminAnswersParams } from '@/features/admin/answers/model/types';
import {
  AdminAnswer,
  AdminAnswerById,
  adminAnswerByIdSchema,
  adminAnswersResponseSchema,
} from '@/features/admin/answers/model/schema';

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
