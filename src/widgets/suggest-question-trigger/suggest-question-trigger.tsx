'use client';

import { SuggestQuestion } from '@/features/question-suggestions/components/suggest-question';
import { useAuth } from '@/shared/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { cloneElement, FC, ReactElement, useState } from 'react';

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
