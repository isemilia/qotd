import { toSearchParams } from '@/server/utils/search-params';
import { RequestStatus } from '@/server/model/types';
import { Pagination } from '@/shared/model/schemas';
import { GetAdminSuggestionsParams } from '@/features/admin/suggestions/model/types';
import {
  AdminSuggestion,
  adminSuggestionResponseSchema,
} from '@/features/admin/suggestions/model/schema';

export const getAdminSuggestions = async (
  params?: GetAdminSuggestionsParams,
) => {
  const paramsString = params ? '?' + toSearchParams(params) : '';
  const response = await fetch(`/api/admin/suggestions${paramsString}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: { suggestions: AdminSuggestion[]; pagination: Pagination };
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminSuggestionResponseSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};
