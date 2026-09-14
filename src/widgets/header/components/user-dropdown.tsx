'use client';

import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { Text, TextColor } from '@/ui/primitives/text';
import { UserRow } from '@/server/model/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/primitives/dropdown-menu';
import { ProfileLinearIcon } from '@/ui/icons/linear/profile-linear.icon';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import Link from 'next/link';
import { LogoutLinearIcon } from '@/ui/icons/linear/logout-linear.icon';
import { useLogout } from '@/features/auth/api/mutations';

export const UserDropdown = ({ user }: { user: UserRow }) => {
  const logout = useLogout();

  const menuItems = [
    {
      label: 'Manage account',
      href: '#',
      icon: ProfileLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
    {
      label: 'My answers',
      href: '#',
      icon: MessageLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
    {
      label: 'Log out',
      icon: LogoutLinearIcon,
      color: 'error',
      onClick: async () => {
        await logout.mutateAsync();
      },
      closeOnClick: false,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'cursor-pointer'}>
        <div className={'flex items-center gap-4'}>
          <Text
            className={'text-[14px]'}
            color={'secondary'}
            weight={'semibold'}
          >
            {user.name}
          </Text>
          <ProfileFilledIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={'end'}
        sideOffset={16}
        className={'shadow-card min-w-[232px]'}
      >
        {menuItems.map((item, i) => {
          const Icon = item.icon;

          const content = (
            <Text
              className='flex items-center gap-3 text-[14px]'
              weight={'medium'}
              color={item.color as TextColor}
              tabIndex={-1}
            >
              <Icon className='size-5 pointer-events-none' />
              <span>{item.label}</span>
            </Text>
          );

          return (
            <DropdownMenuItem
              className={'px-5 py-4 cursor-pointer'}
              closeOnClick={item.closeOnClick}
            >
              {item.href ? (
                <Link href={item.href}>{content}</Link>
              ) : (
                <button
                  type='button'
                  className={'block w-full'}
                  onClick={item.onClick}
                >
                  {content}
                </button>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
