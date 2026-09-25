import { ReactNode } from 'react';
import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { ContentContainer } from '@/ui/primitives/content-container';
import { Text } from '@/ui/primitives/text';
import { getCurrentUser } from '@/server/utils/session';
import NotFound from 'next/dist/client/components/builtin/not-found';
import { ProfileNavigation } from '@/features/profile/components/profile-navigation';

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    return <NotFound />;
  }

  return (
    <div className={'mt-10'}>
      <ContentContainer>
        <div className={'flex items-center gap-5'}>
          <ProfileFilledIcon className={'size-15'} />
          <div>
            <Text className={'text-[24px]'} weight={'medium'}>
              {user.name}
            </Text>
            <Text className={'text-[14px] mt-0.5'} color={'secondary'}>
              {user.answerCount} answers
            </Text>
          </div>
        </div>

        <ProfileNavigation />
      </ContentContainer>

      {children}
    </div>
  );
};

export default Layout;
