import { FC, ReactNode } from 'react';
import { Text } from '@/ui/primitives/text';
import { cn } from '@/shared/utils/cn';

export const InfoField: FC<{
  label: string;
  value?: ReactNode;
  capitalize?: boolean;
}> = ({ label, value, capitalize }) => {
  return (
    <div>
      <Text color={'secondary'} className={'text-[12px]'}>
        {label}
      </Text>
      <Text className={cn('text-[14px] mt-1', capitalize && 'capitalize')}>
        {value || '-'}
      </Text>
    </div>
  );
};
