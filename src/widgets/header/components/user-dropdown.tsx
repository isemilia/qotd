import { ProfileFilledIcon } from '@/ui/icons/filled/profile-filled.icon';
import { Text } from '@/ui/primitives/text';
import { UserRow } from '@/server/model/types';

export const UserDropdown = ({ user }: { user: UserRow }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <Text className={'text-[14px]'} color={'secondary'}>
        {user.name}
      </Text>
      <ProfileFilledIcon />
    </div>
  );
};
