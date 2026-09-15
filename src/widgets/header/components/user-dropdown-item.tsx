import { FC } from 'react';
import Link from 'next/link';
import { DropdownMenuItem } from '@/ui/primitives/dropdown-menu';
import { UserDropdownItemType } from '@/widgets/header/model/types';
import { Text } from '@/ui/primitives/text';
import { Spinner } from '@/ui/primitives/spinner';
import { cn } from '@/shared/utils/cn';

export const UserDropdownItem: FC<
  UserDropdownItemType & { loading?: boolean }
> = ({
  color = 'primary',
  icon: Icon,
  label,
  href,
  closeOnClick,
  onClick,
  loading,
}) => {
  const content = (
    <Text
      className='flex items-center gap-3 text-[14px]'
      weight={'medium'}
      color={color}
    >
      {loading ? (
        <Spinner className={'size-5 pointer-events-none'} />
      ) : (
        <Icon className={'size-5 pointer-events-none'} />
      )}
      <span>{label}</span>
    </Text>
  );

  return (
    <DropdownMenuItem
      className={cn(
        'px-5 py-4 cursor-pointer',
        loading && 'pointer-events-none cursor-not-allowed opacity-70',
      )}
      closeOnClick={closeOnClick}
    >
      {href ? (
        <Link href={href}>{content}</Link>
      ) : (
        <button type='button' className={'block w-full'} onClick={onClick}>
          {content}
        </button>
      )}
    </DropdownMenuItem>
  );
};
