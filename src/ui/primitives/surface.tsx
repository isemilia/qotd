import { FC, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export const Surface: FC<{
  children: ReactNode;
  className?: string | string[];
}> = ({ children, className }) => {
  return (
    <div className={cn('p-5 bg-white shadow-card rounded-[16px]', className)}>
      {children}
    </div>
  );
};
