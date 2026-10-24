import { FC } from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { SuggestionStatus } from '@/features/admin/suggestions/model/types';

export const propertyMap: Record<
  SuggestionStatus,
  { bg: string; text: string; label: string }
> = {
  pending: {
    bg: 'bg-cornflower-200',
    text: 'text-cornflower-800',
    label: 'Pending',
  },
  approved: {
    bg: 'bg-mint-200',
    text: 'text-mint-800',
    label: 'Approved',
  },
  rejected: {
    bg: 'bg-destructive-200',
    text: 'text-destructive-800',
    label: 'Rejected',
  },
};

export const SuggestionStatusChip: FC<{ variant?: SuggestionStatus }> = ({
  variant = 'pending',
}) => {
  return (
    <Text
      component={'div'}
      className={cn(
        propertyMap[variant].bg,
        propertyMap[variant].text,
        'grid h-5 max-w-fit place-content-center rounded-full px-3 text-[12px]',
      )}
      weight={'medium'}
    >
      {propertyMap[variant].label}
    </Text>
  );
};
