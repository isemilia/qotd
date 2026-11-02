import {
  getAdminQuestionById,
  getAdminQuestions,
  getUnavailableQuestionDates,
} from '@/features/admin/questions/api/requests';
import { GetAdminQuestionsParams } from '@/features/admin/questions/model/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetAdminQuestions = (params?: GetAdminQuestionsParams) => {
  return useQuery({
    queryKey: ['adminQuestions', params],
    queryFn: () => getAdminQuestions(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAdminQuestionById = (questionId?: string | null) => {
  return useQuery({
    queryKey: ['getAdminQuestionById', questionId],
    queryFn: () => getAdminQuestionById(questionId!),
    enabled: Boolean(questionId),
  });
};

export const useGetUnavailableQuestionDates = () => {
  return useQuery({
    queryKey: ['getUnavailableQuestionDates'],
    queryFn: getUnavailableQuestionDates,
  });
};
