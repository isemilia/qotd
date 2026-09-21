import { ElementType, ReactNode } from 'react';
import { DynamicProps } from '@/shared/model/types';
import { cn } from '@/shared/utils/cn';

const fonts = {
  sans: 'font-sans',
  mono: 'font-mono',
};

const colors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  error: 'text-destructive',
  inherit: 'text-inherit',
};

const weights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const decorations = {
  none: 'no-underline',
  underline: 'underline',
  lineThrough: 'line-through',
};

export type TextColor = keyof typeof colors | undefined;

export const Text = <T extends ElementType = 'p'>({
  component,
  font = 'sans',
  color = 'primary',
  weight = 'normal',
  decoration = 'none',
  className,
  children,
  ...props
}: DynamicProps<
  T,
  {
    children: ReactNode;
    font?: keyof typeof fonts;
    color?: TextColor;
    weight?: keyof typeof weights;
    decoration?: keyof typeof decorations;
  }
>) => {
  const Component = component || 'p';

  return (
    <Component
      className={cn(
        'transition-colors',
        fonts[font],
        colors[color],
        weights[weight],
        decorations[decoration],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
