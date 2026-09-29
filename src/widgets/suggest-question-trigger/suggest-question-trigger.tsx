'use client';

import { cloneElement, FC, ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/providers/auth-provider';
import { SuggestQuestion } from '@/features/question-suggestions/components/suggest-question';

export const SuggestQuestionTrigger: FC<{
  children: ReactElement<{ onClick?: Function }>;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {cloneElement(children, {
        onClick: (event: Event) => {
          if (!isAuthenticated) {
            router.push('/sign-in');
            return;
          }

          children.props.onClick?.(event);
          setIsOpen(true);
        },
      })}

      <SuggestQuestion isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
};
