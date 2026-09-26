import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from 'cn';

type InputVariant = 'default' | 'foreground';

const variants: Record<InputVariant, string> = {
  default: 'bg-input',
  foreground: 'bg-foreground shadow-card',
};

function Input({
  className,
  type,
  variant = 'default',
  ...props
}: React.ComponentProps<'input'> & { variant?: InputVariant }) {
  return (
    <InputPrimitive
      type={type}
      data-slot='input'
      className={cn(
        'h-[42px] w-full min-w-0 rounded-[12px] border border-transparent px-4 py-3 text-[14px] text-primary transition-[color,box-shadow] duration-200 outline-none placeholder:text-secondary focus-visible:border-ring focus-visible:ring-1 focus-visible:!ring-secondary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Input };
