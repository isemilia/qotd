export const adminRejectionReasonKeys = [
  'unsuitable',
  'duplicate',
  'inappropriate',
  'unclear',
  'other',
] as const;

export type AdminRejectionReasonKey = (typeof adminRejectionReasonKeys)[number];

export const adminRejectionReasons: Record<AdminRejectionReasonKey, string> = {
  unsuitable: 'Not a good fit for Commonly',
  duplicate: 'Duplicate question',
  inappropriate: 'Inappropriate content',
  unclear: 'Unclear or poorly phrased',
  other: 'Other',
} as const;

export const adminRejectionReasonOptions: {
  label: string;
  name: AdminRejectionReasonKey;
}[] = [
  { label: 'Not a good fit for Commonly', name: 'unsuitable' },
  { label: 'Duplicate question', name: 'duplicate' },
  { label: 'Inappropriate content', name: 'inappropriate' },
  { label: 'Unclear or poorly phrased', name: 'unclear' },
  { label: 'Other', name: 'other' },
];
