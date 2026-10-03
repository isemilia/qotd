import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@/ui/primitives/text';
import { Button } from '@/ui/primitives/button';
import { getCurrentUser } from '@/server/utils/session';
import { UserDropdown } from '@/widgets/header/components/user-dropdown';
import { MobileMenu } from '@/widgets/header/components/mobile-menu';

export const Header: FC = async () => {
  const me = await getCurrentUser();

  const isAuthenticated = Boolean(me);

  return (
    <div
      className={
        'h-16 max-md:h-12.5 max-md:px-5 px-15 flex justify-between items-center'
      }
    >
      <nav className={'flex items-center gap-7'}>
        <Link href={'/'}>
          <Image
            src={'/logo.svg'}
            alt={'Logo'}
            width={77}
            height={23}
            className={'max-w-[58px]'}
          />
        </Link>

        <ul className={'flex items-center gap-4 text-[14px] max-md:hidden'}>
          <li>
            <Text
              component={Link}
              href={'/previous-questions'}
              color={'secondary'}
            >
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
      <div className={'max-md:hidden'}>
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
      <div className={'md:hidden'}>
        <MobileMenu isAuthenticated={isAuthenticated} username={me?.name} />
      </div>
    </div>
  );
};
