import { getCurrentUser } from '@/server/utils/session';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/primitives/collapsible';
import { Text } from '@/ui/primitives/text';
import { ArrowLeft } from 'lucide-react';
import { FC } from 'react';
import { SidebarItem } from './sidebar-item';
import { SidebarLogoutButton } from './sidebar-logout-button';

export const SidebarProfile: FC = async () => {
  const user = await getCurrentUser();

  return (
    <Collapsible>
      <CollapsibleTrigger className={'w-full cursor-pointer'}>
        <div
          className={
            'bg-primary-foreground flex items-center gap-3 rounded-[8px] p-2'
          }
        >
          <ProfileFilledIcon className={'size-8'} />
          <div>
            <Text className={'text-[14px]'} weight={'semibold'}>
              {user?.name}
            </Text>
            <Text
              color={'secondary'}
              className={'mt-px -ml-1 text-[12px] capitalize'}
            >
              {user?.role}
            </Text>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className={'mt-2'}>
        <div className={'space-y-1'}>
          <SidebarItem icon={ArrowLeft} href={'/'} label={'View app'} />
          <SidebarLogoutButton />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
