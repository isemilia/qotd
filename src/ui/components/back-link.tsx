'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Text } from '@/ui/primitives/text';

export const BackLink = () => {
  const router = useRouter();

  return (
    <Text
      component='button'
      type='button'
      onClick={() => router.back()}
      color='secondary'
      className='hover:text-primary flex cursor-pointer items-center gap-2 text-[14px] transition-colors'
    >
      <ArrowLeft className='size-4' />
      Back
    </Text>
  );
};
