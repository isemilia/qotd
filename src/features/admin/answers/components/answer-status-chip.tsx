import { FC } from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { AnswerStatus } from '@/features/admin/answers/model/types';

export const propertyMap: Record<
  AnswerStatus,
  { bg: string; text: string; label: string }
> = {
  hidden: {
    bg: 'bg-sand-200',
    text: 'text-sand-800',
    label: 'Hidden',
  },
  published: {
    bg: 'bg-mint-200',
    text: 'text-mint-800',
    label: 'Published',
  },
  deleted: {
    bg: 'bg-destructive-200',
    text: 'text-destructive-800',
    label: 'Deleted',
  },
};

export const AnswerStatusChip: FC<{ variant?: AnswerStatus }> = ({
  variant = 'published',
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
