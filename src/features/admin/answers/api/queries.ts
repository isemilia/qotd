import {
  getAdminAnswerById,
  getAdminAnswers,
} from '@/features/admin/answers/api/requests';
import { GetAdminAnswersParams } from '@/features/admin/answers/model/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetAdminAnswers = (params?: GetAdminAnswersParams) => {
  return useQuery({
    queryKey: ['adminAnswers', params],
    queryFn: () => getAdminAnswers(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAdminAnswerById = (answerId?: string | null) => {
  return useQuery({
    queryKey: ['adminAnswerById'],
    queryFn: () => getAdminAnswerById(answerId!),
    enabled: Boolean(answerId),
  });
};
