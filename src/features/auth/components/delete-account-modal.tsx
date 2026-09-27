'use client';

import { FC, useState } from 'react';
import { Button } from '@/ui/primitives/button';
import { TrashIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { ResponsiveModal } from '@/ui/components/responsive-modal';

export const DeleteAccountModal: FC<{ triggerClassName?: string }> = ({
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      >
        <form></form>
      </ResponsiveModal>
    </>
  );
};
