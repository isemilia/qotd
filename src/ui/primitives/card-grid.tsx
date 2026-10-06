import { FC, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export const CardGrid: FC<{ children?: ReactNode; className?: string }> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1',
        className,
      )}
    >
      {children}
    </div>
  );
};
