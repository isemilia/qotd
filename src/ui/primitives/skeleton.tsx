import { cn } from 'cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'bg-background-skeleton animate-pulse rounded-2xl',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
