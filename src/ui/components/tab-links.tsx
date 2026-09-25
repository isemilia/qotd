'use client';

import { FC } from 'react';
import { Text } from '@/ui/primitives/text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type TabLinkItem = {
  label: string;
  href: string;
};

export const TabLinks: FC<{
  items: TabLinkItem[];
}> = ({ items }) => {
  const value = usePathname();

  return (
    <div className={'mt-8'}>
      <div className={'flex items-center relative'}>
        {items.map((item) => {
          return (
            <Link href={item.href} key={item.href}>
              <Text
                component={'button'}
                color={value === item.href ? 'primary' : 'secondary'}
                weight={value === item.href ? 'medium' : 'normal'}
                className={
                  'cursor-pointer text-[14px] py-2.5 px-5 relative transition-all'
                }
              >
                {item.label}
                {value === item.href ? (
                  <span
                    className={
                      'absolute -bottom-px left-0 w-full h-0.5 bg-primary rounded-full'
                    }
                  />
                ) : null}
              </Text>
            </Link>
          );
        })}
        <div className={'h-px w-full absolute bottom-0 bg-primary/20'} />
      </div>
    </div>
  );
};
