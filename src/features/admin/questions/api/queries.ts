import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getAdminQuestionById,
  getAdminQuestions,
} from '@/features/admin/questions/api/requests';
import { GetAdminQuestionsParams } from '@/features/admin/questions/model/types';

export const useGetAdminQuestions = (params?: GetAdminQuestionsParams) => {
  return useQuery({
    queryKey: ['adminQuestions', params],
    queryFn: () => getAdminQuestions(params),
    placeholderData: keepPreviousData,
  });
};
export const useGetAdminQuestionById = (questionId?: string | null) => {
  return useQuery({
    queryKey: ['adminQuestions', questionId],
    queryFn: () => getAdminQuestionById(questionId!),
    enabled: Boolean(questionId),
  });
};
