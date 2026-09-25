import { MenuItem } from '@/widgets/header/model/types';
import { ProfileLinearIcon } from '@/ui/icons/linear/profile-linear.icon';
import { MessageLinearIcon } from '@/ui/icons/linear/message-linear.icon';
import { LoginLinearIcon } from '@/ui/icons/linear/login-linear.icon';
import { AddUserLinearIcon } from '@/ui/icons/linear/add-user-linear.icon';
import { ChronologyLinearIcon } from '@/ui/icons/linear/chronology-linear.icon';
import { CommentLinearIcon } from '@/ui/icons/linear/comment-linear.icon';
import { ListLinearIcon } from '@/ui/icons/linear/list-linear.icon';
import { NoteLinearIcon } from '@/ui/icons/linear/note-linear.icon';
import { UserDocumentLinearIcon } from '@/ui/icons/linear/user-document-linear.icon';
import { MailLinearIcon } from '@/ui/icons/linear/mail-linear.icon';

export const mobileMenuGroups = {
  authenticated: [
    {
      label: 'Manage account',
      href: '#',
      icon: ProfileLinearIcon,
      color: 'primary',
    },
    {
      label: 'My answers',
      href: '/profile/answers',
      icon: MessageLinearIcon,
      color: 'primary',
    },
  ] as MenuItem[],
  unauthenticated: [
    {
      label: 'Sign in',
      href: '/sign-in',
      icon: LoginLinearIcon,
      color: 'primary',
    },
    {
      label: 'Create an account',
      href: '/sign-up',
      icon: AddUserLinearIcon,
      color: 'primary',
    },
  ] as MenuItem[],
  shared: [
    [
      {
        label: 'Previous questions',
        href: '#',
        icon: ChronologyLinearIcon,
        color: 'primary',
      },
      {
        label: 'Suggest a question',
        href: '#',
        icon: CommentLinearIcon,
        color: 'primary',
      },
    ],
    [
      {
        label: 'Guidelines',
        href: '#',
        icon: ListLinearIcon,
        color: 'primary',
      },
      {
        label: 'Terms',
        href: '#',
        icon: NoteLinearIcon,
        color: 'primary',
      },
      {
        label: 'Privacy',
        href: '#',
        icon: UserDocumentLinearIcon,
        color: 'primary',
      },
      {
        label: 'Contact',
        href: '#',
        icon: MailLinearIcon,
        color: 'primary',
      },
    ],
  ] as MenuItem[][],
};
