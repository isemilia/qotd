import { PersonalDetailsForm } from '@/features/auth/components/personal-details-form';
import { Text } from '@/ui/primitives/text';
import { getCurrentUser } from '@/server/utils/session';
import NotFound from 'next/dist/client/components/builtin/not-found';
import { ChangePasswordForm } from '@/features/auth/components/change-password-form';
import { DeleteAccountModal } from '@/features/auth/components/delete-account-modal';

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
        <Text color={'secondary'} className={'text-[14px] mt-3'}>
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
