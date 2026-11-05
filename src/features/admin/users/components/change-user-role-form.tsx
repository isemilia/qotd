'use client';

import {
  adminChangeUserRoleForm,
  UpdateAdminUserForm,
} from '@/features/admin/users/model/schema';
import { UserRole } from '@/features/auth/model/types';
import { ControlledSelect } from '@/ui/components/controlled-select';
import { Button } from '@/ui/primitives/button';
import { Text } from '@/ui/primitives/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

export const ChangeUserRoleForm: FC<{
  isPending?: boolean;
  defaultValues?: Partial<UpdateAdminUserForm>;
  onSubmit: (data: UpdateAdminUserForm) => void;
  onCancel?: () => void;
}> = ({ defaultValues, onSubmit, isPending, onCancel }) => {
  const form = useForm({
    defaultValues: {
      role: defaultValues?.role || ('user' as UserRole),
    },
    resolver: zodResolver(adminChangeUserRoleForm),
  });

  const options = [
    { value: 'user', label: 'User' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <form>
      <div className={'space-y-4'}>
        <ControlledSelect
          control={form.control}
          name={'role'}
          label={'Select role'}
          options={options}
          required
        />
        <Text color={'secondary'}>
          Changing this user's role will update their access and permissions
          across Commonly
        </Text>
      </div>

      <div
        className={
          'mt-6 flex items-center justify-end gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
        }
      >
        <Button disabled={isPending} onClick={onCancel} variant={'outline'}>
          Cancel
        </Button>
        <Button loading={isPending} onClick={form.handleSubmit(onSubmit)}>
          Change role
        </Button>
      </div>
    </form>
  );
};
