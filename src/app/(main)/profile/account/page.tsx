import { ChangePasswordForm } from '@/features/auth/components/change-password-form';
import { DeleteAccountModal } from '@/features/auth/components/delete-account-modal';
import { PersonalDetailsForm } from '@/features/auth/components/personal-details-form';
import { getCurrentUser } from '@/server/utils/session';
import { Text } from '@/ui/primitives/text';
import { Metadata } from 'next';
import NotFound from 'next/dist/client/components/builtin/not-found';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your account details',
};

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <NotFound />;
  }

  return (
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

      <div>
        <Text weight={'medium'} className={'text-[24px]'}>
          Danger zone
        </Text>
        <Text color={'secondary'} className={'mt-3 text-[14px]'}>
          Deleting your account will permanently remove your account and
          personal information. Your anonymous answers will remain on the
          platform
        </Text>
        <DeleteAccountModal triggerClassName={'mt-4'} />
      </div>
    </div>
  );
};

export default Page;
