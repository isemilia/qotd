export const questionStatuses = [
  'previous',
  'active',
  'next',
  'scheduled',
] as const;

export type QuestionStatus = (typeof questionStatuses)[number];
