import { FC } from 'react';
import { MenuItem } from '../model/types';
import Link from 'next/link';
import { Text } from '@/ui/primitives/text';

export const MobileMenuItem: FC<MenuItem> = ({
  icon: Icon,
  color = 'primary',
  label,
  href,
  onClick,
}) => {
  const content = (
    <Text
      className={'flex items-center gap-3 text-[14px]'}
      color={color}
      weight={'medium'}
    >
      <Icon className={'size-5'} />
      <span>{label}</span>
    </Text>
  );

  return (
    <div className={'bg-foreground px-4 py-4 rounded-[16px] shadow-card'}>
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
