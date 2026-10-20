import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAdminSuggestions } from '@/features/admin/suggestions/api/requests';
import { GetAdminSuggestionsParams } from '@/features/admin/suggestions/model/types';

export const useGetAdminSuggestions = (params?: GetAdminSuggestionsParams) => {
  return useQuery({
    queryKey: ['adminSuggestions', params],
    queryFn: () => getAdminSuggestions(params),
    placeholderData: keepPreviousData,
  });
};
