'use client';

import { CreateAnswer } from '@/features/answers/components/create-answer';
import { useAuth } from '@/shared/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { cloneElement, FC, ReactElement, useState } from 'react';

export const CreateAnswerTrigger: FC<{
  children: ReactElement<{ onClick?: Function }>;
  question: { id: string; question: string };
}> = ({ children, question }) => {
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

      <CreateAnswer
        question={question}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
    </>
  );
};
