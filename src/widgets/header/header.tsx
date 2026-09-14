import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@/ui/primitives/text';
import { Button } from '@/ui/primitives/button';
import { getCurrentUser } from '@/server/utils/session';
import { UserDropdown } from '@/widgets/header/components/user-dropdown';

export const Header: FC = async () => {
  const me = await getCurrentUser();

  const isAuthenticated = Boolean(me);

  console.log(me);

  return (
    <div className={'h-16 px-15 flex justify-between items-center'}>
      <nav className={'flex items-center gap-7'}>
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt={'Logo'} width={58} height={26} />
        </Link>

        <ul className={'flex items-center gap-4 text-[14px]'}>
          <li>
            <Text component={Link} href={'#'} color={'secondary'}>
              Previous questions
            </Text>
          </li>
          <li>
            <Text component={Link} href={'#'} color={'secondary'}>
              Suggest a question
            </Text>
          </li>
        </ul>
      </nav>
      {isAuthenticated ? (
        <UserDropdown user={me!} />
      ) : (
        <div className={'flex items-center gap-4'}>
          <Link href={'/sign-up'}>
            <Button variant={'secondary'}>Create an account</Button>
          </Link>
          <Link href={'/sign-in'}>
            <Button>Sign in</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
