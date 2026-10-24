'use client';

import { CalendarCheck, LayoutDashboard, ListPlus, Users } from 'lucide-react';
import { Text } from '@/ui/primitives/text';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { SidebarItem } from './sidebar-item';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

export const SidebarItemList: FC = () => {
  const pathname = usePathname();

  const groups = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Questions',
      items: [
        {
          label: 'Scheduled',
          href: '/admin/scheduled',
          icon: CalendarCheck,
        },
        {
          label: 'Suggestions',
          href: '/admin/suggestions',
          icon: ListPlus,
        },
      ],
    },
    {
      title: 'Answers',
      items: [
        {
          label: 'Answers',
          href: '/admin/answers',
          icon: MessageLinearIcon,
        },
      ],
    },
    {
      title: 'Users',
      items: [
        {
          label: 'Users',
          href: '/admin/users',
          icon: Users,
        },
      ],
    },
  ];
  return (
    <div className={'mt-10 space-y-6'}>
      {groups.map((group) => {
        return (
          <div key={group.title}>
            <Text
              font={'mono'}
              color={'secondary'}
              className={'text-[12px] tracking-[1px] uppercase'}
            >
              {group.title}
            </Text>
            <div className={'mt-3 space-y-1'}>
              {group.items.map((item) => {
                return (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    isActive={item.href === pathname}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
