import { toSearchParams } from '@/server/utils/search-params';
import { RequestStatus } from '@/server/model/types';
import { Pagination } from '@/shared/model/schemas';
import { GetAdminSuggestionsParams } from '@/features/admin/suggestions/model/types';
import {
  AdminSuggestion,
  adminSuggestionResponseSchema,
  adminSuggestionSchema,
  ApproveAdminSuggestionBody,
  RejectAdminSuggestionBody,
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

export const getAdminSuggestionById = async (suggestionId: string) => {
  const response = await fetch(`/api/admin/suggestions/${suggestionId}`);

  const result: {
    message: string;
    status: RequestStatus;
    data: AdminSuggestion;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  const parsedData = adminSuggestionSchema.safeParse(result.data);

  return { ...result, data: parsedData.data };
};

export const approveAdminSuggestion = async ({
  suggestionId,
  body,
}: {
  suggestionId: string;
  body: ApproveAdminSuggestionBody;
}) => {
  const response = await fetch(
    `/api/admin/suggestions/${suggestionId}/approve`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const rejectAdminSuggestion = async ({
  suggestionId,
  body,
}: {
  suggestionId: string;
  body: RejectAdminSuggestionBody;
}) => {
  const response = await fetch(
    `/api/admin/suggestions/${suggestionId}/reject`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
