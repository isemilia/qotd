import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from 'cn';
import * as React from 'react';

type InputVariant = 'default' | 'foreground';

const variants: Record<InputVariant, string> = {
  default: 'bg-input',
  foreground: 'bg-foreground shadow-card',
};

type InputProps = React.ComponentProps<'input'> & {
  variant?: InputVariant;
  icon?: React.ReactNode;
};

function Input({
  className,
  type,
  variant = 'default',
  icon,
  ...props
}: InputProps) {
  const input = (
    <InputPrimitive
      type={type}
      data-slot='input'
      className={cn(
        'text-primary placeholder:text-secondary focus-visible:border-ring focus-visible:!ring-secondary aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-[42px] w-full min-w-0 rounded-[12px] border border-transparent px-4 py-3 text-[14px] transition-[color,box-shadow] duration-200 outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 aria-invalid:ring-1',
        variants[variant],
        icon && 'pl-9',
        className,
      )}
      {...props}
    />
  );

  if (!icon) return input;

  return (
    <div className='relative'>
      <span className='text-secondary pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
        {icon}
      </span>
      {input}
    </div>
  );
}

export { Input };
