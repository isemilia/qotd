import { FC } from 'react';
import { TabLinks } from '@/ui/components/tab-links';

export const ProfileNavigation: FC = () => {
  const items = [
    { label: 'Answers', name: 'answers', href: '/profile/answers' },
    { label: 'Favorites', name: 'favorites', href: '/profile/favorites' },
    { label: 'Suggestions', name: 'suggestions', href: '/profile/suggestions' },
    { label: 'Account', name: 'account', href: '/profile/account' },
  ];

  return (
    <TabLinks
      items={items}
      className={'no-scrollbar mt-8 overflow-auto max-md:mt-5'}
    />
  );
};
