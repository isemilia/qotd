import { ContentContainer } from '@/ui/primitives/content-container';
import { PersonalDetailsForm } from '@/features/auth/components/personal-details-form';
import { Text } from '@/ui/primitives/text';
import { getCurrentUser } from '@/server/utils/session';
import NotFound from 'next/dist/client/components/builtin/not-found';

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <NotFound />;
  }

  return (
    <ContentContainer className={'mt-8 max-md:mt-6 max-md:pb-10'}>
      <div className={'max-w-[448px]'}>
        <Text weight={'medium'} className={'text-[24px]'}>
          Personal details
        </Text>
        <PersonalDetailsForm
          defaultValues={{ name: user.name, email: user.email }}
          className={'mt-6'}
        />
      </div>
    </ContentContainer>
  );
};

export default Page;
