'use client';

import { useLogout } from '@/features/auth/api/mutations';
import { PublicUser } from '@/server/model/types';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { HeartLinearIcon } from '@/ui/icons/linear/heart-linear.icon';
import { LogoutLinearIcon } from '@/ui/icons/linear/logout-linear.icon';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { ProfileLinearIcon } from '@/ui/icons/linear/profile-linear.icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/primitives/dropdown-menu';
import { Text } from '@/ui/primitives/text';
import { UserDropdownItem } from '@/widgets/header/components/user-dropdown-item';
import { UserDropdownItemType } from '../model/types';

export const UserDropdown = ({ user }: { user: PublicUser }) => {
  const logout = useLogout();

  const menuItems: UserDropdownItemType[] = [
    {
      label: 'Manage account',
      href: '/profile/account',
      icon: ProfileLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
    {
      label: 'My answers',
      href: '/profile/answers',
      icon: MessageLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
    {
      label: 'Favorites',
      href: '/profile/favorites',
      icon: HeartLinearIcon,
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
