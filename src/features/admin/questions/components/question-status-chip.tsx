import { QuestionStatus } from '@/features/admin/questions/model/types';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { FC } from 'react';

export const propertyMap: Record<
  QuestionStatus,
  { bg: string; text: string; label: string }
> = {
  previous: {
    bg: 'bg-cornflower-200',
    text: 'text-cornflower-800',
    label: 'Previous',
  },
  active: {
    bg: 'bg-mint-200',
    text: 'text-mint-800',
    label: 'Active',
  },
  next: {
    bg: 'bg-sand-200',
    text: 'text-sand-800',
    label: 'Next',
  },
  scheduled: {
    bg: 'bg-lavender-200',
    text: 'text-lavender-800',
    label: 'Scheduled',
  },
};

export const QuestionStatusChip: FC<{ variant?: QuestionStatus }> = ({
  variant = 'previous',
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
