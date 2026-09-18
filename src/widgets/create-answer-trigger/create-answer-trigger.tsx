'use client';

import { cloneElement, FC, ReactElement, useState } from 'react';
import { CreateAnswer } from '@/features/answers/components/create-answer';

export const CreateAnswerTrigger: FC<{
  children: ReactElement<{ onClick?: Function }>;
  question: { id: string; question: string };
}> = ({ children, question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {cloneElement(children, {
        onClick: (event: Event) => {
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
