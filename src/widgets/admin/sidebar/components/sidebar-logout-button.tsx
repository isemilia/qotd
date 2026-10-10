'use client';

import { FC } from 'react';
import { LogoutLinearIcon } from '@/ui/icons/linear/logout-linear.icon';
import { SidebarItem } from './sidebar-item';

export const SidebarLogoutButton: FC = () => {
  return (
    <SidebarItem
      icon={LogoutLinearIcon}
      onClick={() => {
        console.log('log out');
      }}
      color={'error'}
      label={'Log out'}
    />
  );
};
