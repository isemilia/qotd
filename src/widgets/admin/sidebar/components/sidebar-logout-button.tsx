'use client';

import { FC } from 'react';
import { LogoutLinearIcon } from '@/ui/icons/linear/logout-linear.icon';
import { SidebarItem } from './sidebar-item';
import { useLogout } from '@/features/auth/api/mutations';

export const SidebarLogoutButton: FC = () => {
  const logout = useLogout();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <SidebarItem
      icon={LogoutLinearIcon}
      onClick={handleLogout}
      loading={logout.isPending}
      color={'error'}
      label={'Log out'}
    />
  );
};
