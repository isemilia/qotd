import { FC } from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { UserStatus } from '@/features/admin/users/model/types';

export const propertyMap: Record<
  UserStatus,
  { bg: string; text: string; label: string }
> = {
  active: {
    bg: 'bg-mint-200',
    text: 'text-mint-800',
    label: 'Active',
  },
  deleted: {
    bg: 'bg-destructive-200',
    text: 'text-destructive-800',
    label: 'Deleted',
  },
};

export const UserStatusChip: FC<{ variant?: UserStatus }> = ({
  variant = 'active',
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
