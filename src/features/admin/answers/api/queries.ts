import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetAdminAnswersParams } from '@/features/admin/answers/model/types';
import { getAdminAnswers } from '@/features/admin/answers/api/requests';

export const useGetAdminAnswers = (params?: GetAdminAnswersParams) => {
  return useQuery({
    queryKey: ['adminSuggestions', params],
    queryFn: () => getAdminAnswers(params),
    placeholderData: keepPreviousData,
  });
};
