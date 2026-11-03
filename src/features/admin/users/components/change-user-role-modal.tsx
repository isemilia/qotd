'use client';

import { useGetAdminUserById } from '@/features/admin/users/api/queries';
import { ChangeUserRoleForm } from '@/features/admin/users/components/change-user-role-form';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { Text } from '@/ui/primitives/text';
import { FC } from 'react';

export const ChangeUserRoleModal: FC<{
  isOpen: boolean;
  close: () => void;
  userId?: string | null;
}> = ({ isOpen, close, userId }) => {
  const userRequest = useGetAdminUserById(userId);
  const user = userRequest.data?.data;

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={() => {
        close();
      }}
      classNames={{ dialogContent: 'w-full max-w-[504px]! gap-0' }}
    >
      <div className={'space-y-4'}>
        <Text component={'h2'} weight={'medium'} className={'text-[24px]'}>
          Change user's role
        </Text>
        <div className={'flex items-center gap-3'}>
          <ProfileFilledIcon className={'size-8'} />
          <div>
            <Text className={'text-[14px]'} weight={'semibold'}>
              {user?.name}
            </Text>
            <Text color={'secondary'} className={'text-[12px]'}>
              {user?.email}
            </Text>
          </div>
        </div>
        <ChangeUserRoleForm />
      </div>
    </ResponsiveModal>
  );
};
