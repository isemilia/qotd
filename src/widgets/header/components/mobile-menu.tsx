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
import { useLogout } from '@/features/auth/api/mutations';
import { Text } from '@/ui/primitives/text';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';

export const MobileMenu: FC<{
  isAuthenticated: boolean;
  username?: string | null;
}> = ({ isAuthenticated, username }) => {
  const logout = useLogout();

  const currentYear = new Date().getFullYear();

  const menu: MenuItem[][] = [
    isAuthenticated
      ? mobileMenuGroups.authenticated
      : mobileMenuGroups.unauthenticated,
    ...mobileMenuGroups.shared,
  ];

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <Dialog>
      <DialogTrigger>
        {isAuthenticated ? (
          <div className={'flex items-center gap-3'}>
            <Text
              className={'text-[14px]'}
              color={'secondary'}
              weight={'semibold'}
            >
              {username}
            </Text>
            <ProfileFilledIcon className={'size-7'} />
          </div>
        ) : (
          <MenuLinearIcon
            className={'text-secondary pointer-events-none size-6'}
          />
        )}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={
          'bg-background grid h-full min-w-full grid-rows-[auto_1fr] gap-2.5 rounded-none p-0'
        }
      >
        <DialogHeader
          className={'flex h-12.5 flex-row items-center justify-between px-5'}
        >
          <Image
            src={'/logo.svg'}
            alt={'Logo'}
            width={104}
            height={18}
            className={'max-w-[104px]'}
          />
          <DialogClose>
            <XIcon className={'text-secondary size-6'} />
          </DialogClose>
        </DialogHeader>

        <div className={'flex h-full flex-col gap-4 overflow-auto px-5 pb-6'}>
          {menu.map((group, i) => {
            return (
              <Fragment key={i}>
                <div className={'space-y-4'}>
                  {group.map((item, i) => {
                    return (
                      <DialogClose key={i} className={'block w-full'}>
                        <MobileMenuItem {...item} />
                      </DialogClose>
                    );
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
                loading={logout.isPending}
              />
            </>
          ) : null}
          <Text className={'mt-auto text-center text-[12px] opacity-40'}>
            © {currentYear} QOTD | All rights reserved
          </Text>
        </div>
      </DialogContent>
    </Dialog>
  );
};
