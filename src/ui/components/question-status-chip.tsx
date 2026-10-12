import { FC } from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';

export type QuestionStatus = 'previous' | 'next' | 'active' | 'scheduled';

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
        'rounded-full max-w-fit text-[12px] px-3 h-5 grid place-content-center',
      )}
      weight={'medium'}
    >
      {propertyMap[variant].label}
    </Text>
  );
};
