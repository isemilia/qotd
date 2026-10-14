import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAdminQuestions } from '@/features/admin/questions/api/requests';
import { GetAdminQuestionsParams } from '@/features/admin/questions/model/types';

export const useGetAdminQuestions = (params?: GetAdminQuestionsParams) => {
  return useQuery({
    queryKey: ['adminQuestions', params],
    queryFn: () => getAdminQuestions(params),
    placeholderData: keepPreviousData,
  });
};
