import { FC } from 'react';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { Text } from '@/ui/primitives/text';
import { getCurrentUser } from '@/server/utils/session';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/primitives/collapsible';
import { SidebarItem } from './sidebar-item';
import { ArrowLeft } from 'lucide-react';
import { SidebarLogoutButton } from './sidebar-logout-button';

export const SidebarProfile: FC = async () => {
  const user = await getCurrentUser();

  return (
    <Collapsible>
      <CollapsibleTrigger className={'w-full cursor-pointer'}>
        <div
          className={
            'bg-primary-foreground p-2 rounded-[8px] flex items-center gap-3'
          }
        >
          <ProfileFilledIcon className={'size-8'} />
          <div>
            <Text className={'text-[14px]'} weight={'semibold'}>
              {user?.name}
            </Text>
            <Text
              color={'secondary'}
              className={'text-[12px] mt-px capitalize -ml-1'}
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
