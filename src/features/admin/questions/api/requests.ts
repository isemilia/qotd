import { RequestStatus } from '@/server/model/types';
import { GetAdminQuestionsParams } from '@/features/admin/questions/model/types';
import { toSearchParams } from '@/server/utils/search-params';
import {
  AdminQuestion,
  adminQuestionResponseSchema,
  adminQuestionSchema,
  CreateAdminQuestionBody,
  EditAdminQuestionBody,
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

export const editAdminQuestion = async (body: EditAdminQuestionBody) => {
  const response = await fetch('/api/admin/questions', {
    method: 'PUT',
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

export const getAdminQuestionById = async (questionId: string) => {
  const response = await fetch(`/api/admin/questions/${questionId}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: AdminQuestion;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminQuestionSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};

export const deleteAdminQuestionById = async (questionId: string) => {
  const response = await fetch(`/api/admin/questions/${questionId}`, {
    method: 'DELETE',
  });

  const result: {
    message: string;
    status: RequestStatus;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const getUnavailableQuestionDates = async () => {
  const response = await fetch('/api/admin/questions/dates/unavailable');

  const result: {
    message: string;
    status: RequestStatus;
    data: string[];
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
