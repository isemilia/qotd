'use client';

import { FC } from 'react';
import { MenuLinearIcon } from '@/ui/icons/linear/menu-linear.icon';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/ui/primitives/dialog';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

export const MobileMenu: FC = () => {
  return (
    <Dialog>
      <DialogTrigger
        // todo: check if it actually works on mobile devices
        onClick={() => {
          console.log('trigger');
        }}
      >
        <MenuLinearIcon
          className={'size-6 text-secondary pointer-events-none'}
        />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={'h-full min-w-full rounded-none bg-background p-0'}
      >
        <DialogHeader
          className={'h-12.5 px-5 flex flex-row items-center justify-between'}
        >
          <Image
            src={'/logo.svg'}
            alt={'Logo'}
            width={77}
            height={23}
            className={'max-w-[58px]'}
          />
          <DialogClose>
            <XIcon className={'size-6 text-secondary'} />
          </DialogClose>
        </DialogHeader>

        <div className={'flex flex-col gap-4'}></div>
      </DialogContent>
    </Dialog>
  );
};
