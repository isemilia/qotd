import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export const ContentContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('px-15 max-md:px-5', className)}>
      <div className={'content-container'}>{children}</div>
    </div>
  );
};
