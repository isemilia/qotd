export const answerStatuses = ['published', 'hidden', 'deleted'] as const;

export type AnswerStatus = (typeof answerStatuses)[number];
