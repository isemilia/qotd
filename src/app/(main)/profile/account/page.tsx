import { ContentContainer } from '@/ui/primitives/content-container';
import { PersonalDetailsForm } from '@/features/auth/components/personal-details-form';
import { Text } from '@/ui/primitives/text';
import { getCurrentUser } from '@/server/utils/session';
import NotFound from 'next/dist/client/components/builtin/not-found';
import { ChangePasswordForm } from '@/features/auth/components/change-password-form';

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <NotFound />;
  }

  return (
    <ContentContainer className={'mt-8 max-md:mt-6 max-md:pb-10'}>
      <div className={'max-w-[448px] space-y-10'}>
        <div>
          <Text weight={'medium'} className={'text-[24px]'}>
            Personal details
          </Text>
          <PersonalDetailsForm
            defaultValues={{ name: user.name, email: user.email }}
            className={'mt-6'}
          />
        </div>

        <div>
          <Text weight={'medium'} className={'text-[24px]'}>
            Change password
          </Text>
          <ChangePasswordForm className={'mt-6'} />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Page;
