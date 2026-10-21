export const answerStatuses = ['published', 'hidden', 'deleted'] as const;

export type AnswerStatus = (typeof answerStatuses)[number];

export type GetAdminAnswersParams = {
  status?: AnswerStatus;
  search?: string;
  page?: number;
  pageSize?: number;
};
