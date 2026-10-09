import Link from 'next/link';
import Image from 'next/image';
import { Text } from '@/ui/primitives/text';
import { Fragment } from 'react';

export const Footer = () => {
  const footerLinks = [
    { label: 'Guidelines', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <div
      className={
        'relative max-md:px-5 px-15 flex justify-between py-8 mt-25 max-md:hidden'
      }
    >
      <hr
        className={
          'border-secondary/20 w-[85%] absolute top-0 left-1/2 -translate-x-1/2'
        }
      />
      <div>
        <Link href={'/'}>
          <Image
            src={'/logo.svg'}
            alt={'Logo'}
            width={104}
            height={18}
            className={'max-w-[104px]'}
          />
        </Link>
        <Text color={'secondary'} className={'text-[14px] mt-2'}>
          One question, countless perspectives
        </Text>
      </div>

      <div>
        <nav className={'flex items-center gap-2 text-[14px]'}>
          {footerLinks.map((item, i, arr) => {
            return (
              <Fragment key={i}>
                <Text component={Link} href={item.href} color={'secondary'}>
                  {item.label}
                </Text>
                {i === arr.length - 1 ? null : <span>·</span>}
              </Fragment>
            );
          })}
        </nav>

        <Text color={'secondary'} className={'text-[14px] mt-3 text-right'}>
          © 2026 QOTD. All rights reserved.
        </Text>
      </div>
    </div>
  );
};
