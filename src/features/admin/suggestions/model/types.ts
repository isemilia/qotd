export const suggestionStatuses = ['approved', 'pending', 'rejected'] as const;

export type SuggestionStatus = (typeof suggestionStatuses)[number];

export type GetAdminSuggestionsParams = {
  status?: SuggestionStatus;
  search?: string;
  page?: number;
  pageSize?: number;
};
