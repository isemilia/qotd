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
      className='text-[14px] flex items-center gap-2 cursor-pointer transition-colors hover:text-primary'
    >
      <ArrowLeft className='size-4' />
      Back
    </Text>
  );
};
