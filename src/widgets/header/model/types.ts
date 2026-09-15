import { ComponentType, SVGProps } from 'react';
import { TextColor } from '@/ui/primitives/text';

export type MenuItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color?: TextColor;
  // closeOnClick: boolean;
} & (
  | {
      href: string;
      onClick?: never;
    }
  | {
      href?: never;
      onClick: () => void;
    }
);
