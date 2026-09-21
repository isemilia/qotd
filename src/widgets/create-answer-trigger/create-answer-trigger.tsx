'use client';

import { cloneElement, FC, ReactElement, useState } from 'react';
import { CreateAnswer } from '@/features/answers/components/create-answer';
import { useMe } from '@/features/auth/api/queries';
import { useRouter } from 'next/navigation';

export const CreateAnswerTrigger: FC<{
  children: ReactElement<{ onClick?: Function }>;
  question: { id: string; question: string };
}> = ({ children, question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const getMe = useMe();
  const isAuthenticated = Boolean(getMe.isSuccess && getMe.data.data.id);

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
