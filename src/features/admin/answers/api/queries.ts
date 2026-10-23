import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetAdminAnswersParams } from '@/features/admin/answers/model/types';
import {
  getAdminAnswerById,
  getAdminAnswers,
} from '@/features/admin/answers/api/requests';

export const useGetAdminAnswers = (params?: GetAdminAnswersParams) => {
  return useQuery({
    queryKey: ['getAdminAnswers', params],
    queryFn: () => getAdminAnswers(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAdminAnswerById = (answerId?: string | null) => {
  return useQuery({
    queryKey: ['getAdminAnswerById'],
    queryFn: () => getAdminAnswerById(answerId!),
    enabled: Boolean(answerId),
  });
};
