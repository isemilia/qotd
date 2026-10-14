export const questionStatuses = [
  'previous',
  'active',
  'next',
  'scheduled',
] as const;

export type QuestionStatus = (typeof questionStatuses)[number];

export type GetAdminQuestionsParams = {
  status?: QuestionStatus;
  search?: string;
  page?: number;
  pageSize?: number;
};
