'use client';

import { FC, Fragment } from 'react';
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
import { MenuItem } from '@/widgets/header/model/types';
import { MobileMenuItem } from '@/widgets/header/components/mobile-menu-item';
import { mobileMenuGroups } from '@/widgets/header/model/constants';
import { LogoutLinearIcon } from '@/ui/icons/linear/logout-linear.icon';

export const MobileMenu: FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const menu: MenuItem[][] = [
    isAuthenticated
      ? mobileMenuGroups.authenticated
      : mobileMenuGroups.unauthenticated,
    ...mobileMenuGroups.shared,
  ];

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <MenuLinearIcon
          className={'size-6 text-secondary pointer-events-none'}
        />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={
          'h-full min-w-full gap-2.5 rounded-none bg-background p-0 grid grid-rows-[auto_1fr]'
        }
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

        <div className={'space-y-4 px-5 h-full overflow-auto pb-6'}>
          {menu.map((group, i) => {
            return (
              <Fragment key={i}>
                <div className={'space-y-4'}>
                  {group.map((item, i) => {
                    return <MobileMenuItem {...item} key={i} />;
                  })}
                </div>
                {i !== menu.length - 1 ? (
                  <hr className={'border-secondary/15'} />
                ) : null}
              </Fragment>
            );
          })}
          {isAuthenticated ? (
            <>
              <hr className={'border-secondary/15'} />
              <MobileMenuItem
                label={'Log out'}
                icon={LogoutLinearIcon}
                color={'error'}
                onClick={handleLogout}
              />
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
