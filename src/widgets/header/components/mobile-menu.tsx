'use client';

import { ComponentType, FC, SVGProps, useEffect } from 'react';
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
import { ProfileLinearIcon } from '@/ui/icons/linear/profile-linear.icon';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { ChronologyLinearIcon } from '@/ui/icons/linear/chronology-linear.icon';
import { CommentLinearIcon } from '@/ui/icons/linear/comment-linear.icon';
import { ListLinearIcon } from '@/ui/icons/linear/list-linear.icon';
import { NoteLinearIcon } from '@/ui/icons/linear/note-linear.icon';
import { UserDocumentLinearIcon } from '@/ui/icons/linear/user-document-linear.icon';
import { MailLinearIcon } from '@/ui/icons/linear/mail-linear.icon';
import { LogoutLinearIcon } from '@/ui/icons/linear/logout-linear.icon';
import { LoginLinearIcon } from '@/ui/icons/linear/login-linear.icon';
import { AddUserLinearIcon } from '@/ui/icons/linear/add-user-linear.icon';
import Link from 'next/link';
import { Text, TextColor } from '@/ui/primitives/text';

type MenuItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: TextColor;
  closeOnClick: boolean;
} & (
  | {
      href: string;
      onClick?: never;
    }
  | {
      href?: never;
      onClick: () => void;
    }
);

export const MobileMenu: FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  useEffect(() => {
    console.log('MobileMenu rendered');
  }, []);

  const authenticatedItems: MenuItem[] = [
    {
      label: 'Manage account',
      href: '#',
      icon: ProfileLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
    {
      label: 'My answers',
      href: '#',
      icon: MessageLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
  ];

  const unauthenticatedItems: MenuItem[] = [
    {
      label: 'Sign in',
      href: '#',
      icon: LoginLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
    {
      label: 'Create an account',
      href: '#',
      icon: AddUserLinearIcon,
      color: 'primary',
      closeOnClick: true,
    },
  ];

  const sharedMenuGroups: MenuItem[][] = [
    [
      {
        label: 'Previous questions',
        href: '#',
        icon: ChronologyLinearIcon,
        color: 'primary',
        closeOnClick: true,
      },
      {
        label: 'Suggest a question',
        href: '#',
        icon: CommentLinearIcon,
        color: 'primary',
        closeOnClick: true,
      },
    ],
    [
      {
        label: 'Guidelines',
        href: '#',
        icon: ListLinearIcon,
        color: 'primary',
        closeOnClick: true,
      },
      {
        label: 'Terms',
        href: '#',
        icon: NoteLinearIcon,
        color: 'primary',
        closeOnClick: true,
      },
      {
        label: 'Privacy',
        href: '#',
        icon: UserDocumentLinearIcon,
        color: 'primary',
        closeOnClick: true,
      },
      {
        label: 'Contact',
        href: '#',
        icon: MailLinearIcon,
        color: 'primary',
        closeOnClick: true,
      },
    ],
    [
      {
        label: 'Log out',
        onClick: () => {
          console.log('logout');
        },
        icon: LogoutLinearIcon,
        color: 'error',
        closeOnClick: false,
      },
    ],
  ];

  const menu: MenuItem[][] = [
    isAuthenticated ? authenticatedItems : unauthenticatedItems,
    ...sharedMenuGroups,
  ];

  return (
    <Dialog>
      <DialogTrigger
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

        <div className={'space-y-4 px-5'}>
          {menu.map((group, i) => {
            return (
              <>
                <div className={'space-y-4'}>
                  {group.map((item, i) => {
                    const Icon = item.icon;

                    const content = (
                      <Text
                        className={'flex items-center gap-3'}
                        color={item.color}
                      >
                        <Icon className={'size-5'} />
                        <span>{item.label}</span>
                      </Text>
                    );
                    return (
                      <div
                        className={
                          'bg-foreground px-4 py-3 rounded-[16px] shadow-card h-11'
                        }
                      >
                        {item.href ? (
                          <Link href={item.href}>{content}</Link>
                        ) : (
                          <button
                            type='button'
                            className={'block w-full'}
                            onClick={item.onClick}
                          >
                            {content}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
