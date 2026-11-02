import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import { FC, ReactNode } from 'react';

export const InfoField: FC<{
  label: string;
  value?: ReactNode;
  capitalize?: boolean;
}> = ({ label, value, capitalize }) => {
  const primitives = ['string', 'number'];

  return (
    <div>
      <Text color={'secondary'} className={'text-[12px]'}>
        {label}
      </Text>
      <Text
        component={primitives.includes(typeof value) ? 'p' : 'div'}
        className={cn('mt-1 text-[14px]', capitalize && 'capitalize')}
      >
        {value || '-'}
      </Text>
    </div>
  );
};
