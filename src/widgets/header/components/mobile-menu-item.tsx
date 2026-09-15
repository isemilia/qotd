import { FC } from 'react';
import { MenuItem } from '../model/types';
import Link from 'next/link';
import { Text } from '@/ui/primitives/text';
import { Spinner } from '@/ui/primitives/spinner';
import { cn } from '@/shared/utils/cn';

export const MobileMenuItem: FC<MenuItem & { loading?: boolean }> = ({
  icon: Icon,
  color = 'primary',
  label,
  href,
  onClick,
  loading,
}) => {
  const content = (
    <Text
      className={'flex items-center gap-3 text-[14px]'}
      color={color}
      weight={'medium'}
    >
      {loading ? (
        <Spinner className={'size-5'} />
      ) : (
        <Icon className={'size-5'} />
      )}
      <span>{label}</span>
    </Text>
  );

  return (
    <div
      className={cn(
        'bg-foreground px-4 py-4 rounded-[16px] shadow-card',
        loading && 'pointer-events-none cursor-not-allowed opacity-70',
      )}
    >
      {href ? (
        <Link href={href}>{content}</Link>
      ) : (
        <button type='button' className={'block w-full'} onClick={onClick}>
          {content}
        </button>
      )}
    </div>
  );
};
