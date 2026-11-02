'use client';

import { cn } from '@/shared/utils/cn';
import { Text } from '@/ui/primitives/text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export type TabLinkItem = {
  label: string;
  href: string;
};

export const TabLinks: FC<{
  items: TabLinkItem[];
  className?: string;
}> = ({ items, className }) => {
  const value = usePathname();

  return (
    <div className={cn('relative flex items-center', className)}>
      {items.map((item) => {
        return (
          <Link href={item.href} key={item.href}>
            <Text
              component={'button'}
              color={value === item.href ? 'primary' : 'secondary'}
              weight={value === item.href ? 'medium' : 'normal'}
              className={
                'relative cursor-pointer px-5 py-2.5 text-[14px] transition-all'
              }
            >
              {item.label}
              {value === item.href ? (
                <span
                  className={
                    'bg-primary absolute -bottom-px left-0 h-0.5 w-full rounded-full'
                  }
                />
              ) : null}
            </Text>
          </Link>
        );
      })}
      <div className={'bg-primary/20 absolute bottom-0 h-px w-full'} />
    </div>
  );
};
