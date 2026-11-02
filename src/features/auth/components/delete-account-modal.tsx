'use client';

import { useDeleteAccount } from '@/features/auth/api/mutations';
import { accountDeletionClientSchema } from '@/features/auth/model/schemas';
import { cn } from '@/shared/utils/cn';
import { ControlledTextarea } from '@/ui/components/controlled-textarea';
import { ResponsiveModal } from '@/ui/components/responsive-modal';
import { Button } from '@/ui/primitives/button';
import { Text } from '@/ui/primitives/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrashIcon } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const DeleteAccountModal: FC<{ triggerClassName?: string }> = ({
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      reason: '',
    },
    resolver: zodResolver(accountDeletionClientSchema),
  });

  const deleteAccount = useDeleteAccount();

  const handleSubmit = async (
    data: z.infer<typeof accountDeletionClientSchema>,
  ) => {
    await deleteAccount.mutateAsync({ reason: data.reason });
  };

  return (
    <>
      <Button
        variant={'outline'}
        className={cn(
          'border-destructive text-destructive hover:bg-destructive/10',
          triggerClassName,
        )}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <TrashIcon className={'size-4'} />
        <span>Delete account</span>
      </Button>
      <ResponsiveModal
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
        classNames={{
          dialogContent: 'max-w-[504px]! w-full gap-4',
        }}
      >
        <div>
          <Text className={'text-[24px]'} weight={'medium'}>
            Delete your account?
          </Text>
          <Text
            component={'div'}
            color={'secondary'}
            className={'mt-2 text-[14px]'}
          >
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <p>
              Your account and personal information will be permanently deleted.
              Your anonymous answers will remain on the platform.
            </p>
          </Text>
        </div>
        <form>
          <ControlledTextarea
            name={'reason'}
            label={'Why are you leaving? (Optional)'}
            placeholder={'Tell us why...'}
            maxLength={500}
            control={form.control}
            className={'min-h-[100px]'}
          />

          <div
            className={
              'mt-6 flex items-center justify-end gap-4 max-md:grid max-md:grid-cols-2 max-md:gap-3'
            }
          >
            <Button disabled={deleteAccount.isPending} variant={'outline'}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              loading={deleteAccount.isPending}
              className={'bg-destructive hover:bg-destructive/80'}
            >
              Delete account
            </Button>
          </div>
        </form>
      </ResponsiveModal>
    </>
  );
};
