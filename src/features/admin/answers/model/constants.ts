export const adminAnswerHideReasonKeys = [
  'irrelevant',
  'spam',
  'inappropriate',
  'unclear',
  'personal',
  'other',
] as const;

export type AdminAnswerHideReasonKey =
  (typeof adminAnswerHideReasonKeys)[number];

export const adminAnswerHideReasons: Record<AdminAnswerHideReasonKey, string> =
  {
    irrelevant: 'Irrelevant to the question',
    spam: 'Spam or self-promotion',
    inappropriate: 'Inappropriate or offensive content',
    unclear: 'Unclear or poorly phrased',
    personal: 'Personal or sensitive information',
    other: 'Other',
  } as const;

export const adminAnswerHideReasonOptions: {
  label: string;
  name: AdminAnswerHideReasonKey;
}[] = [
  { label: 'Irrelevant to the question', name: 'irrelevant' },
  { label: 'Spam or self-promotion', name: 'spam' },
  { label: 'Inappropriate content', name: 'inappropriate' },
  { label: 'Unclear or poorly phrased', name: 'unclear' },
  { label: 'Personal or sensitive information', name: 'personal' },
  { label: 'Other', name: 'other' },
];
