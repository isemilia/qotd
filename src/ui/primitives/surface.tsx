import { cn } from '@/shared/utils/cn';
import { FC, ReactNode } from 'react';

export const Surface: FC<{
  children: ReactNode;
  className?: string | string[];
}> = ({ children, className }) => {
  return (
    <div className={cn('shadow-card rounded-[16px] bg-white p-5', className)}>
      {children}
    </div>
  );
};
