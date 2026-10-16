import { RequestStatus } from '@/server/model/types';
import { GetAdminQuestionsParams } from '@/features/admin/questions/model/types';
import { toSearchParams } from '@/server/utils/search-params';
import {
  AdminQuestion,
  adminQuestionResponseSchema,
  CreateAdminQuestionBody,
} from '@/features/admin/questions/model/schema';
import { Pagination } from '@/shared/model/schemas';

export const getAdminQuestions = async (params?: GetAdminQuestionsParams) => {
  const paramsString = params ? '?' + toSearchParams(params) : '';
  const response = await fetch(`/api/admin/questions${paramsString}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: { questions: AdminQuestion[]; pagination: Pagination };
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminQuestionResponseSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};

export const createAdminQuestion = async (body: CreateAdminQuestionBody) => {
  const response = await fetch('/api/admin/questions', {
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
