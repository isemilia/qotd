import {
  getAdminSuggestionById,
  getAdminSuggestions,
} from '@/features/admin/suggestions/api/requests';
import { GetAdminSuggestionsParams } from '@/features/admin/suggestions/model/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useGetAdminSuggestions = (params?: GetAdminSuggestionsParams) => {
  return useQuery({
    queryKey: ['adminSuggestions', params],
    queryFn: () => getAdminSuggestions(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetAdminSuggestionById = (suggestionId?: string | null) => {
  return useQuery({
    queryKey: ['adminSuggestionById'],
    queryFn: () => getAdminSuggestionById(suggestionId!),
    enabled: Boolean(suggestionId),
  });
};
