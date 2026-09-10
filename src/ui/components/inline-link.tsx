import { FC } from 'react';
import Link from 'next/link';
import { Text } from '@/ui/primitives/text';

export const InlineLink: FC<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  return (
    <Text
      component={Link}
      href={href}
      weight={'semibold'}
      decoration={'underline'}
      color={'inherit'}
    >
      {children}
    </Text>
  );
};
