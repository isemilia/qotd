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
import { UserDropdownItemType } from '../model/types';
import { UserDropdownItem } from '@/widgets/header/components/user-dropdown-item';

export const UserDropdown = ({ user }: { user: UserRow }) => {
  const logout = useLogout();

  const menuItems: UserDropdownItemType[] = [
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
  ];

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

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
          return <UserDropdownItem key={i} {...item} />;
        })}
        <UserDropdownItem
          label={'Log out'}
          icon={LogoutLinearIcon}
          color={'error'}
          closeOnClick={false}
          onClick={handleLogout}
          loading={logout.isPending}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
